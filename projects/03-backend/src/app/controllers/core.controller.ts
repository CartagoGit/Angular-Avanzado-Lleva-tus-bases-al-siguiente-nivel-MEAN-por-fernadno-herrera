import { Request } from 'express';
import {
	getModelSection,
	getNewModelSection,
} from '../helpers/get-model-section.helper';
import { getPayloadFromJwtWithoutVerifiy } from '../helpers/json-web-token.helper';
import { UserModel } from '../models/mongo-models/user.model';
import { getSectionFromUrl } from '../helpers/get-model-section.helper';
import { checkIdInParams } from '../helpers/validator.helper';
import { getErrorNotFields } from '../helpers/default-responses.helper';
import { PaginationParameters } from 'mongoose-paginate-v2';
import {
	RequestFieldModifierArrays,
	RequestFieldValues,
} from '../interfaces/requests.interface';

/**
 * ? Controladores generales para los metodos que usan todos los modelos
 * @type {{
	getAll: (req: Request) => Promise<any>;
	getById: (req: Request) => Promise<any>;
	getByQuery: (req: Request) => Promise<any>;
	post: (req: Request) => Promise<any>;
	put: (req: Request) => Promise<any>;
	delete: (req: Request) => Promise<any>;
	deleteCollection: (req: Request) => Promise<any>;
	addInList: (req: Request) => Promise<any>;
	removeFromList: (req: Request) => Promise<any>;
}}
 */
export const coreController: {
	getAll: (req: Request) => Promise<any>;
	getById: (req: Request) => Promise<any>;
	getByQuery: (req: Request) => Promise<any>;
	post: (req: Request) => Promise<any>;
	put: (req: Request) => Promise<any>;
	delete: (req: Request) => Promise<any>;
	deleteCollection: (req: Request) => Promise<any>;
	addInList: (req: Request) => Promise<any>;
	removeFromList: (req: Request) => Promise<any>;
} = {
	getAll: async (req) => {
		const model = getModelSection(req);
		const data = await (model as any).paginate(
			...new PaginationParameters(req).get()
		);
		return { ...data, status_code: 200 };
	},
	getById: async (req) => {
		checkIdInParams(req);
		const id = req.params['id'];
		const data = await getModelSection(req).findById(id);
		return { data, status_code: 200 };
	},
	getByQuery: async (req) => {
		if (req.query['include'] === undefined) req.query['include'] = 'true';
		const model = getModelSection(req);
		const wantInclude =
			(req.query['include'] as string).toLowerCase() === 'true';
		const queryParams = req.query;
		const paramsInModel = Object.keys(model.schema.obj);
		const arrayQuery = Object.entries(queryParams)
			.filter(([key]) => paramsInModel.includes(key))
			.map(([key, value]) => {
				return {
					[key]: wantInclude ? RegExp(value as string, 'i') : value,
				};
			});

		let objectQuery = {};
		for (const keyValue of arrayQuery) {
			objectQuery = { ...objectQuery, ...keyValue };
		}

		const optionsPaginate = new PaginationParameters(req).get()[1];
		const data = await (model as any).paginate(objectQuery, optionsPaginate);

		return {
			queryParams,
			modelParams: objectQuery,
			include: wantInclude,
			...data,
			status_code: 200,
		};
	},
	post: async (req) => {
		const section = getSectionFromUrl(req);
		if (section !== 'users') {
			const { id } = getPayloadFromJwtWithoutVerifiy(req);
			const creator: typeof UserModel | null = await UserModel.findById(id);
			req.body['user_creator'] = creator;
		}
		const model = getNewModelSection(req);
		await model.save();

		return { model, status_code: 201 };
	},
	put: async (req) => {
		checkIdInParams(req);
		const id = req.params['id'];
		const model = getModelSection(req);
		const data_before = await model.findById(id);
		const data = await model.findByIdAndUpdate(
			id,
			{ ...data_before?.toJSON(), ...req.body },
			{ new: true }
		);
		return {
			data_before,
			data,
			id,
			status_code: 201,
		};
	},
	delete: async (req) => {
		checkIdInParams(req);
		const id = req.params['id'];
		const data = await getModelSection(req).findByIdAndDelete(id, {
			new: true,
		});
		return {
			data,
			id,
			status_code: 200,
		};
	},
	deleteCollection: async (req) => {
		await getModelSection(req).collection.drop();
		return {
			data: 'Collection deleted',
			status_code: 200,
		};
	},
	addInList: async (req) => {
		checkIdInParams(req);
		/**
		 * * Ejemplo de request:
		 * {
		 *   "patients": {
		 *       "values": [
		 *           "63e8ddd633084649421d18ce"
		 *       ],"options": {
		 *           "is_unique": false
		 * * <---- Por defecto es true si no existe 'options.is_unique' evitando que se repitan parametros que sean unicos en el array
		 *       }
		 *   },
		 *   "hospitals": {
		 *       "values": [
		 *           "63e919fdb0ddb137c04deb67"
		 *        ],
		 *        "options": {
		 *           "is_unique": false
		 *         }
		 *    }
		 * }
		 */
		const fields: RequestFieldModifierArrays = req.body;
		if (!fields || Object.keys(fields).length === 0)
			throw getErrorNotFields('add');

		let fieldsUniques: RequestFieldValues = {};
		let fieldsNotUniques: RequestFieldValues = {};
		for (let [field, { values, options }] of Object.entries(fields)) {
			const fieldValues: RequestFieldValues = { [field]: values };
			if (!options || options?.is_unique)
				fieldsUniques = { ...fieldsUniques, ...fieldValues };
			else fieldsNotUniques = { ...fieldsNotUniques, ...fieldValues };
		}
		const id = req.params['id'];
		const model = getModelSection(req);
		const data_before = await model.findById(id);

		const data = await model.findByIdAndUpdate(
			id,
			{ $push: fieldsNotUniques, $addToSet: fieldsUniques },
			{ new: true }
		);
		return {
			data_before,
			data,
			info: 'Items added into list',
			status_code: 201,
		};
	},
	removeFromList: async (req) => {
		checkIdInParams(req);
		const fields: RequestFieldValues = req.body;
		if (!fields || Object.keys(fields).length === 0)
			throw getErrorNotFields('remove');

		const id = req.params['id'];
		const model = getModelSection(req);
		const data_before = await model.findById(id);
		const data = await model.findByIdAndUpdate(
			id,
			{ $pullAll: fields },
			{ new: true }
		);

		return {
			data_before,
			data,
			info: 'Items removed from list',
			status_code: 201,
		};
	},
};
