import { query, Request } from 'express';
import {
	getModelSection,
	getNewModelSection,
} from '../helpers/get-model-section.helper';
import { createJWT } from '../helpers/json-web-token.helper';

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
} = {
	getAll: async (req) => {
		const data = await getModelSection(req).find();
		return { data, status_code: 200 };
	},
	getById: async (req) => {
		const id = req.params['id'];
		const data = await getModelSection(req).findById(id);
		return { data, status_code: 200 };
	},
	getByQuery: async (req) => {
		if (req.query['include'] === undefined) req.query['include'] = 'true';
		const model = getModelSection(req);
		const paramsInModel = Object.keys(model.schema.obj);
		const wantInclude =
			(req.query['include'] as string).toLowerCase() === 'true';
		const queryParams = req.query;
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
		const data = await model
			.find(objectQuery)
			.skip(req.query['skip'] ? Number(req.query['skip']) : 0) // start
			.limit(req.query['limit'] ? Number(req.query['limit']) : Infinity) // finish
			.sort(
				req.query['sort']
					? {
							[req.query['sort'] as string]: req.query['order']
								? (req.query['order'] as any)
								: 'ascending', // criterio de orden asc, desc, ascending, descending, 1, or -1
					  }
					: {}
			);

		return {
			queryParams,
			include: wantInclude,
			data,
			status_code: 200,
		};
	},
	post: async (req) => {
		const model = getNewModelSection(req);
		await model.save();
		const { token } = await createJWT({ id: model.id });

		return { model, status_code: 201, token };
	},
	put: async (req) => {
		const id = req.params['id'];
		const model = getModelSection(req);
		const data_before = await model.findById(id);
		const data = await model.findByIdAndUpdate(id, req.body, { new: true });
		return {
			data_before,
			data,
			id,
			status_code: 201,
		};
	},
	delete: async (req) => {
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
};
