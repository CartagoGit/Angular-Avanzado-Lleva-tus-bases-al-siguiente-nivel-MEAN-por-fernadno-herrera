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
import { LogType } from '../interfaces/logs.interfaces';
import { getNotFoundMessage } from '../helpers/get-model-section.helper';

export interface RoutesProps {
	route: string;
	coreController?: CallbackMethod;
	routeRouter?: Router;
	middlewares?: ((...args: any[]) => void)[];
	type?: TypeRequest;
	router?: Router;
	modelController?: CallbackMethod;
}

/**
 * ? Modelo de rutas, donde se almacenaran los paths, controladores, rutas, middlewares, controladores,
 * ? y la creacion y subscripcion de errores
 * @export
 * @class Routes
 * @typedef {Routes}
 */
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

	/**
	 * ? Añade todos sus parametros para cada ruta
	 * @private
	 */
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

	/**
	 * ? Crea la subscripciones y los concatena segun controlador del modelo -> validaciones -> controladores para todas las rutas
	 * @private
	 * @param {Request} req
	 * @param {Response} res
	 * @param {NextFunction} next
	 * @param {RoutesProps} props
	 */
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
					// const errors = validatorCheck(respModel || req);
					const errors = validatorCheck(req);

					if (!!errors) throw errors;
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
					finalError.reason = 'internal error'
					return of({
						error: finalError,
						status_code: finalError.status_code || 500,
					});
				})
			)
			.subscribe({
				next: (respController) => {
					const logType = type?.toUpperCase() as LogType;
					const hasData = !!respController.data || !!respController.model;
					//* Si la respuesta de los controlaodres, contiene ererores...
					if (!!respController.error) {
						defaultErrorResponse(
							req,
							res,
							respController.error as ErrorData,
							logType
						);
						return;
						//*  Si no existe data y la respuesta es de un get, devuelve un error de not found
					} else if (
						!hasData &&
						(logType === 'GET' || logType === 'DELETE')
					) {
						const msgError = getNotFoundMessage(req);
						defaultErrorResponse(
							req,
							res,
							new ErrorData({
								message: msgError,
								status_code: 404,
								keyValue: {},
								reason: 'not found',
							}),
							logType,
							404
						);
						return;
					}
					//* Para cualquier respuesta correcta, crea una respuesta con los datos
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
