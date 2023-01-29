import { Request, Response } from 'express';

export const usersController = {
	getUsers: (_req: Request, res: Response) => {
		res.json({
			message: 'getUsers',
			ok: true,
		});
	},
	getUserById: (_req: Request, res: Response) => {
		res.json({
			message: 'getUserById',
			ok: true,
		});
	},
	postUser: (_req: Request, res: Response) =>
		res.json({
			message: 'postUser',
			ok: true,
		}),
};
