import { Router } from 'express';
import { mongoState } from '../db/init-mongo';
import { CallbackMethod } from '../interfaces/response.interface';
import { validatorCheck } from '../middlewares/validator.middleware';

export interface RoutesProps {
	route: string;
	callback: CallbackMethod | Router;
	middlewares?: ((...args: any[]) => void)[];
	type?: 'get' | 'post' | 'patch' | 'put' | 'delete' | 'use';
	router?: Router;
}

export class Routes {
	// ANCHOR : Variables
	public router: Router = Router();
	public routes: Record<string, RoutesProps>;

	get dbState(): string {
		return mongoState.getState();
	}

	// ANCHOR : Constructor
	constructor(routes: Record<string, RoutesProps>) {
		this.routes = routes;
		this._initRoutes();
	}

	// ANCHOR : Methods
	private _initRoutes(): void {
		for (let [
			name,
			{ route, callback, type = 'use', middlewares = [] },
		] of Object.entries(this.routes)) {
			this.routes[name].router = this.router[type](
				route,
				middlewares,
				validatorCheck,
				callback
			);
		}
	}
}
