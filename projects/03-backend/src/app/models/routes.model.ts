import { NextFunction, Request, Response, Router } from 'express';
import { catchError, concatMap, from, map, of } from 'rxjs';
import { mongoState } from '../db/init-mongo';
import { CallbackMethod, TypeRequest } from '../interfaces/response.interface';
import {
	defaultErrorResponse,
	defaultResponse,
} from '../helpers/default-responses.helper';
import { ErrorData, basicError } from './error-data.model';
import { LogType } from '../interfaces/logs.interfaces';
import { getNotFoundMessage } from '../helpers/get-model-section.helper';
import {
	checkValidatorFields,
	validateAdmin,
	validateSameUser,
} from '../helpers/validator.helper';
import { validateJWT, getErrorJWT } from '../helpers/json-web-token.helper';
import { getErrorNotAdmin } from '../helpers/default-responses.helper';

export interface RoutesProps {
	route: string;
	coreController?: CallbackMethod;
	routeRouter?: Router;
	middlewares?: ((...args: any[]) => void)[];
	hasJwtValidator?: boolean;
	hasAdminValidator?: boolean;
	hasSameUserValidator?: boolean;
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
		const {
			modelController = async () => {},
			coreController,
			hasJwtValidator = true,
			hasAdminValidator = true,
			hasSameUserValidator = true,
			type,
		} = props;
		//* Subscribe para realizar todos los metodos antes de realizar la respuesta
		from(
			//* Comprobamos si el JSON Web Token es valido
			hasJwtValidator || hasAdminValidator
				? from(validateJWT(req))
				: of({ ok: true, id: undefined })
		)
			.pipe(
				concatMap((respValidatorJWT) => {
					const { id, ok: isJwtOk } = respValidatorJWT;
					if (!isJwtOk) throw getErrorJWT();
					//* Si requiere ser Admin comprobamos si el usuario es Administrador
					return hasSameUserValidator
						? from(validateSameUser(req, id!))
						: hasAdminValidator
						? from(validateAdmin(id!))
						: of(respValidatorJWT);
				}),
				concatMap(({ ok: isAdminOrSameUser }) => {
					if (!isAdminOrSameUser) throw getErrorNotAdmin();
					//* Nos subscribimos al controlador especifico del modelo
					return from(modelController(req, res, next));
				}),
				concatMap((respModel) => {
					//* Pasamos las validaciones de los campos de los parametros
					const errors = checkValidatorFields(req);
					if (!!errors) throw errors;
					//* Si pasa el controlador y las validaciones,
					//* nos subscribimos al controlador core para realizar los cambios pertinentes
					return !!coreController
						? from(coreController!(req, res, next)).pipe(
								map((respCore) => ({
									info: respModel?.info || undefined,
									...respCore,
								}))
						  )
						: of(respModel);
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
					finalError.reason = error.reason || 'internal error';
					return of({
						error: finalError,
						status_code: finalError.status_code || 500,
					});
				})
			)
			.subscribe({
				next: (respController) => {
					const logType = type?.toUpperCase() as LogType;
					const hasData =
						typeof respController?.data === 'boolean' ||
						!!respController?.data ||
						typeof respController?.model === 'boolean' ||
						!!respController?.model;
					//* Si la respuesta de los controladores, contiene ererores...
					if (!!respController?.error) {
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
						(logType === 'GET' ||
							logType === 'DELETE' ||
							logType === 'PUT' ||
							logType === 'PATCH')
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
					if (
						(Array.isArray(respController?.data) &&
							respController.data.length === 0) ||
						(Array.isArray(respController?.model) &&
							respController.model.length === 0)
					) {
						respController.info = 'NOT FOUND DATA';
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
