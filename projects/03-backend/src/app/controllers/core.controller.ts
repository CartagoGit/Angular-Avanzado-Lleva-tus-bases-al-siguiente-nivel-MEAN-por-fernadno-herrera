import { Request, Response } from 'express';

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
	post: (_req: Request, res: Response) =>
		res.json({
			message: 'post',
			ok: true,
		}),
};
