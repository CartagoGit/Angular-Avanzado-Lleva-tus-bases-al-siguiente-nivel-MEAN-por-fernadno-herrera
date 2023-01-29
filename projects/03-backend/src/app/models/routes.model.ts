import { Router } from 'express';
import { mongoState } from '../db/init-mongo';
import { CallbackMethod } from '../interfaces/response.interface';

export interface RoutesProps {
	route: string;
	callback: CallbackMethod | Router;
	// callback: (...args: any[]) => void;
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
		for (let [name, { route, callback, type }] of Object.entries(
			this.routes
		)) {
			const typeRequest = type || 'use';
			this.routes[name].router = this.router[typeRequest](route, callback);
		}
	}
}
