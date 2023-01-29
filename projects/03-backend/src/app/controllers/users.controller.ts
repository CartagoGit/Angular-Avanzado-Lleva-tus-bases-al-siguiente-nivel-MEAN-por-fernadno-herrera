import { Request, Response } from 'express';

export const usersController = {
	getUsers: (req: Request, res: Response) => {
		res.json({
			message: 'Pillo los usuario quillo',
			ok: true,
		});
	},
	getUserById: (req: Request, res: Response) => {
		res.json({
			message: 'asdasdo',
			ok: true,
		});
	},
};
