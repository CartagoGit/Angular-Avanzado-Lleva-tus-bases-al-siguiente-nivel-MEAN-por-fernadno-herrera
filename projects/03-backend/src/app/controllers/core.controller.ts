import { Request } from 'express';
import {
	getModelSection,
	getNewModelSection,
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
} = {
	getAll: async (req) => {
		const data = await getModelSection(req).find();
		return { data, status_code: 200, method: 'GET ALL' };
	},
	getById: async (req) => {
		const data = await getModelSection(req).findById(req.params['id']);
		return { data, status_code: 200, method: 'GET BY ID' };
	},
	post: async (req) => {
		const model = getNewModelSection(req);
		await model.save();
		return { model, status_code: 201, method: 'POST' };
	},
	put: async (req) => {
		const id = req.params['id'];
		const data = await getModelSection(req).findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return {
			data,
			id,
			status_code: 201,
		};
	},
};
