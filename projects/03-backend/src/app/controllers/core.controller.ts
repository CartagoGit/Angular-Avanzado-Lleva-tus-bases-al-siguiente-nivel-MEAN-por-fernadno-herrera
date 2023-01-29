import { Request, Response } from 'express';
import { defaultResponse } from '../helpers/default-response';
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
	post: (req: Request, res: Response) => {
		const callback = async () => {
			const model = getModelSection(req);
			await model.save();
			return { model, message: 'POSTED' };
		};

		defaultResponse(res, callback);
	},
};
