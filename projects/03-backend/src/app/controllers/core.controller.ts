import { Request, Response } from 'express';
import {
	getModelSection,
	getNewModelSection,
} from '../helpers/get-model-section.helper';

export const coreController = {
	getAll: async (req: Request, res: Response) => {
		const data = await getModelSection(req).find();
		return { data, message: 'GOT ALL' };
	},
	getById: async (req: Request, res: Response) => {
		const data = await getModelSection(req).findById(req.params['id']);
		return { data, message: 'GOT BY ID' };
	},
	post: async (req: Request, res: Response) => {
		const model = getNewModelSection(req);
		await model.save();
		return { model, message: 'POSTED' };
	},
	put: async (req: Request, res: Response) => {
		const id = req.params['id'];
		const data = await getModelSection(req).findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return { data, message: 'PUT', id };
	},
};
