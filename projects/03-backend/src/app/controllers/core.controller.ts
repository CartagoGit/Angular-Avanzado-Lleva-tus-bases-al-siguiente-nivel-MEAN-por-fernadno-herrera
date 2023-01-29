import { Request, Response } from 'express';
import { getModelSection } from '../helpers/get-model-section.helper';

export const coreController = {
	get: (_req: Request, res: Response) => {
		res.json({
			message: 'getAll',
			ok: true,
		});
	},
	getById: (_req: Request, res: Response) => {
		res.json({
			message: 'getById',
			ok: true,
		});
	},
	post: async (req: Request, res: Response) => {
		const { name, password, email } = req.body;

		const model = getModelSection(req);
		await model.save();
		console.log(model);

		res.json({
			message: 'post',
			ok: true,
			data: model,
		});
	},
};
