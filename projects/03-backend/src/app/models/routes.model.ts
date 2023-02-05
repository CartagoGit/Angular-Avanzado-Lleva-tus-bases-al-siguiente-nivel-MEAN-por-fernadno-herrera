import { NextFunction, Request, Response, Router } from 'express';
import { catchError, concatMap, from, map, of } from 'rxjs';
import { mongoState } from '../db/init-mongo';
import { CallbackMethod, TypeRequest } from '../interfaces/response.interface';
import { validatorCheck } from '../middlewares/validator.middleware';
import {
	defaultErrorResponse,
	defaultResponse,
} from '../helpers/default-responses';
import { ErrorData } from './error-data.model';
import { log } from '../helpers/logs.helper';
import { LogType } from '../interfaces/logs.interfaces';

export interface RoutesProps {
	route: string;
	coreController?: CallbackMethod;
	routeRouter?: Router;
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
		for (const [name, props] of Object.entries(this.routes)) {
			const { route, routeRouter, type = 'use', middlewares = [] } = props;

			const controllers = async (
				req: Request,
				res: Response,
				next: NextFunction
			) => {
				this._createRequestSubscription(req, res, next, props);
			};

			this.routes[name].router = this.router[type](
				route,
				middlewares,
				!!routeRouter ? routeRouter : controllers
			);
		}
	}

	private _createRequestSubscription(
		req: Request,
		res: Response,
		next: NextFunction,
		props: RoutesProps
	): void {
		const { modelController = async () => {}, coreController, type } = props;

		//* Nos subscribimos al controlador especifico del modelo
		from(modelController(req, res, next))
			.pipe(
				concatMap((respModel) => {
					//* Pasamos las validaciones
					const errors = validatorCheck(respModel || req);
					if (!!errors) throw errors;
					console.log(errors);
					console.log(respModel);
					//* Si pasa el controlador y las validaciones,
					//* nos subscribimos al controlador core para realizar los cambios pertinentes
					return from(coreController!(req, res, next)).pipe(
						map((respCore) => ({
							info: respModel?.info || undefined,
							...respCore,
						}))
					);
				}),
				catchError((error) => {
					//* Capturamos cualquier posible error
					let finalError: any = {};
					if (!error.message) {
						finalError = {
							message: error,
							data: {},
						};
					} else finalError = error;
					return of({ error: finalError });
				})
			)
			.subscribe({
				next: (respController) => {
					const logType = type?.toUpperCase() as LogType;
					const hasData = !!respController.data;
					if (!!respController.error) {
						defaultErrorResponse(
							req,
							res,
							respController.error as ErrorData,
							logType
						);
						return;
					} else if (!hasData) {
						const msgError = 'Data NOT FOUND';
						defaultErrorResponse(
							req,
							res,
							new ErrorData({
								message: msgError,
								status_code: 404,
								keyValue: {},
								reason: msgError,
							}),
							logType,
							404
						);
						return;
					}
					defaultResponse(
						req,
						res,
						respController,
						logType,
						respController.status_code
					);
				},

				error: (error) => {
					//* Si hay un error critico lo mostramos
					defaultErrorResponse(
						req,
						res,
						error as ErrorData,
						'CRITICAL ERROR'
					);
				},
			});
	}
}
