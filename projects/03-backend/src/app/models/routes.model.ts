import { NextFunction, Request, Response, Router } from 'express';
import { mongoState } from '../db/init-mongo';
import { CallbackMethod, TypeRequest } from '../interfaces/response.interface';
import { validatorCheck } from '../middlewares/validator.middleware';

export interface RoutesProps {
	route: string;
	controller: CallbackMethod | Router;
	middlewares?: ((...args: any[]) => void)[];
	type?: TypeRequest;
	router?: Router;
	modelController?: CallbackMethod;
}

export class Routes {
	// ANCHOR : Variables
	public router: Router = Router({ strict: true });
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
			{
				route,
				controller,
				type = 'use',
				middlewares = [],
				modelController = (
					req: Request,
					res: Response,
					next: NextFunction
				) => {
					next();
				},
			},
		] of Object.entries(this.routes)) {
			
			this.routes[name].router = this.router[type](
				route,
				middlewares,
				modelController,
				validatorCheck,
				controller
			);
		}
	}
}
