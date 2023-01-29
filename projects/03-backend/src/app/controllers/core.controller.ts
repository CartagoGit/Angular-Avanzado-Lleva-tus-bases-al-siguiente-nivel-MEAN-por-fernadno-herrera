import { Request, Response } from 'express';
import { getModelSection } from '../helpers/get-model-section.helper';
import { logError } from '../helpers/logs.helper';
import { defaultErrorResponse } from '../helpers/auto-responses.helper';

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
		try {
			const model = getModelSection(req);
			await model.save();
			console.log(model);

			res.json({
				message: 'post',
				ok: true,
				data: model,
			});
		} catch (error) {
			defaultErrorResponse(res, error as Error, 'MONGO');
		}
	},
};
