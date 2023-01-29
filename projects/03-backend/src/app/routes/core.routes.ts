import { Request, Response } from 'express';
import { coreController } from '../controllers/core.controller';
import { rootResponse } from '../helpers/root-response';
import { Routes } from '../models/routes.model';

export const coreRoutes: Routes = new Routes({
	base: {
		route: '/',
		callback: (req: Request, res: Response) => {
			const baseUrlSections = req.baseUrl.split('/');
			const section = baseUrlSections[baseUrlSections.length - 1];
			rootResponse(section, res);
		},
		type: 'get',
	},
	getAll: {
		route: '/get-all',
		callback: coreController.get,
		type: 'get',
	},
	getById: {
		route: '/get-by-id',
		callback: coreController.getById,
		type: 'get',
	},
	post: {
		route: '/post',
		callback: coreController.post,
		type: 'post',
	},
});
