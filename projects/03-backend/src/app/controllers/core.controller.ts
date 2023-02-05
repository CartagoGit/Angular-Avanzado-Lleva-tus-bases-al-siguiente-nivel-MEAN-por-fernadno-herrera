import { Request } from 'express';
import {
	getModelSection,
	getNewModelSection,
	getSectionFromUrl,
} from '../helpers/get-model-section.helper';

/**
 * ? Controladores generales para los metodos que usan todos los modelos
 * @type {{
	getAll: (req: Request) => Promise<any>;
	getById: (req: Request) => Promise<any>;
	post: (req: Request) => Promise<any>;
	put: (req: Request) => Promise<any>;
}}
 */
export const coreController: {
	getAll: (req: Request) => Promise<any>;
	getById: (req: Request) => Promise<any>;
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
	post: async (req) => {
		const model = getNewModelSection(req);
		await model.save();
		return { model, status_code: 201 };
	},
	put: async (req) => {
		const id = req.params['id'];
		const data_before = { ...req.body };
		const data = await getModelSection(req).findByIdAndUpdate(id, req.body, {
			new: true,
		});
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
