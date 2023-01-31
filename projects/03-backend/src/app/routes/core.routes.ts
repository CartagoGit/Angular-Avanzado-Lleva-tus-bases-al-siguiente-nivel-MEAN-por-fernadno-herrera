import { Request, Response } from 'express';
import { coreController } from '../controllers/core.controller';

import { Routes } from '../models/routes.model';
import { rootResponse } from '../helpers/default-responses';
import { getSectionFromUrl } from '../helpers/get-model-section.helper';

/**
 * $ Cualquier colleccion de datos
 */

export const coreRoutes: Routes = new Routes({
	base: {
		route: '/',
		controller: (req: Request, res: Response) => {
			rootResponse(getSectionFromUrl(req), res);
		},
		type: 'get',
	},
	getAll: {
		route: '/get-all',
		controller: coreController.getAll,
		type: 'get',
	},
	getById: {
		route: '/get-by-id/:id',
		controller: coreController.getById,
		type: 'get',
	},
	post: {
		route: '/post',
		controller: coreController.post,
		type: 'post',
	},
	put: {
		route: '/put/:id',
		controller: coreController.put,
		type: 'put',
	},
});
