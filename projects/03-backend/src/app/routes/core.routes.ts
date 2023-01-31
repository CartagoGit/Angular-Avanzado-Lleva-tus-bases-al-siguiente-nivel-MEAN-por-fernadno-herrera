import { Request, Response } from 'express';
import { coreController } from '../controllers/core.controller';

import { Routes } from '../models/routes.model';
import { rootResponse } from '../helpers/default-responses';
import { getSectionFromUrl } from '../helpers/get-model-section.helper';

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
		route: '/get-by-id/:id',
		callback: coreController.getById,
		type: 'get',
	},
	post: {
		route: '/post',
		callback: coreController.post,
		type: 'post',
	},
	put : {
		route: '/put/:id',
		callback: coreController.put,
		type: 'put'
	}
});
