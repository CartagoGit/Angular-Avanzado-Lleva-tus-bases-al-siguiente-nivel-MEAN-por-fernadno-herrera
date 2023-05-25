import { Request } from 'express';
import {
	getModelSection,
	getNewModelSection,
} from '../helpers/get-model-section.helper';
import {
	createJWT,
	getPayloadFromJwtWithoutVerifiy,
} from '../helpers/json-web-token.helper';
import { UserModel } from '../models/mongo-models/user.model';
import {
	getSectionFromUrl,
	getMethodFromUrl,
} from '../helpers/get-model-section.helper';
import { checkIdInParams } from '../helpers/validator.helper';
import { getErrorNotFields } from '../helpers/default-responses.helper';
import {
	RequestFieldModifierArrays,
	RequestFieldValues,
} from '../interfaces/requests.interface';
import { ResponseReturnData } from '../interfaces/response.interface';
import { getQueryIncludeAndPaginate } from '../helpers/query.helpers';
import { Document } from 'mongoose';
import { basicError } from '../models/error-data.model';

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
	getAll: (req: Request) => Promise<ResponseReturnData>;
	getById: (req: Request) => Promise<ResponseReturnData>;
	getByQuery: (req: Request) => Promise<ResponseReturnData>;
	post: (req: Request) => Promise<ResponseReturnData>;
	put: (req: Request) => Promise<ResponseReturnData>;
	delete: (req: Request) => Promise<ResponseReturnData>;
	deleteCollection: (req: Request) => Promise<ResponseReturnData>;
	addInList: (req: Request) => Promise<ResponseReturnData>;
	removeFromList: (req: Request) => Promise<ResponseReturnData>;
} = {
	getAll: async (req) => {
		// const model = getModelSection(req);
		const { optionsFromQuery, model } = getQueryIncludeAndPaginate(req);
		const { pagination, data } = await (model as any).paginate(
			{},
			optionsFromQuery
		);

		return { data, status_code: 200, pagination };
	},
	getById: async (req) => {
		checkIdInParams(req);
		const id = req.params['id'];
		const data = await getModelSection(req).findById(id);
		return { data, status_code: 200 };
	},
	getByQuery: async (req) => {
		const {
			optionsFromQuery,
			wantInclude,
			objectQuery,
			model,
			modelParamsInQuery,
		} = getQueryIncludeAndPaginate(req, { returnQueryModels: true });

		const { data, pagination } = await (model as any).paginate(
			objectQuery,
			optionsFromQuery
		);

		return {
			optionsFromQuery,
			modelParamsInQuery,
			include: wantInclude,
			data,
			pagination,
			status_code: 200,
		};
	},
	post: async (req) => {
		const section = getSectionFromUrl(req);
		const { endpoint } = getMethodFromUrl(req);

		let model: Document;
		let token: string | undefined = undefined;
		if (section !== 'users' && endpoint !== 'register') {
			const { id } = getPayloadFromJwtWithoutVerifiy(req);
			const creator: typeof UserModel | null = await UserModel.findById(id);
			req.body['user_creator'] = creator;
			req.body['user_modifier'] = creator;
			model = getNewModelSection(req);
		} else {
			model = new UserModel(req.body);
			(model as any).user_creator = model;
			(model as any).user_modifier = model;
			const { token: newToken = '' } = await createJWT({ id: model.id });
			token = newToken;
		}
		await model.save();

		return { model, status_code: 201, token, id: model.id };
	},
	put: async (req) => {
		checkIdInParams(req);
		const id = req.params['id'];
		const model = getModelSection(req);
		req.body['user_modifier'] = getPayloadFromJwtWithoutVerifiy(req).id;

		const data_before = await model.findById(id);
		// const newData = { ...data_before?.toObject(), ...req.body };
		const data = await model.findByIdAndUpdate(id, req.body, { new: true });
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
		//* Si el usuario intenta eliminarse a si mismo throweamos un error
		if (id === getPayloadFromJwtWithoutVerifiy(req).id) {
			throw {
				message: 'You can not delete yourself',
				status_code: 409,
				reason: 'cannot delete yourself',
			} as basicError;
		}
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
