import { Request, Response } from 'express';
import { coreController } from '../controllers/core.controller';

import { Routes } from '../models/routes.model';
import { getSectionFromUrl } from '../helpers/get-section-from-url.helper';
import { rootResponse } from '../helpers/default-responses';

export const coreRoutes: Routes = new Routes({
	base: {
		route: '/',
		callback: (req: Request, res: Response) => {
			rootResponse(getSectionFromUrl(req), res);
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
