import { Router, Request, Response, NextFunction } from 'express';
import { mongoState } from '../db/init-mongo';

export interface RoutesProps {
	route: string;
	callback:
		| ((req: Request, res: Response, next?: NextFunction) => void)
		| Router;
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
