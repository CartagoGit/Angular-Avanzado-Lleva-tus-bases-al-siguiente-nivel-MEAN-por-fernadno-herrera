import { NextFunction, Request, Response, Router } from 'express';
import { catchError, concatMap, from, map, Observable, of } from 'rxjs';
import { mongoState } from '../db/init-mongo';
import {
	defaultErrorResponse,
	defaultResponse,
} from '../helpers/default-responses.helper';
import { ErrorData } from './error-data.model';
import { LogType } from '../interfaces/logs.interfaces';
import { getNotFoundMessage } from '../helpers/get-model-section.helper';
import {
	checkValidatorFields,
	validateAdmin,
	validateSameUser,
} from '../helpers/validator.helper';
import { validateJWT, getErrorJWT } from '../helpers/json-web-token.helper';
import { getErrorNotAdmin } from '../helpers/default-responses.helper';
import { RoutesProps } from '../interfaces/routes-model-props';

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
	constructor(private _routes: Record<string, RoutesProps>) {
		this.routes = this._routes;
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
		//* Subscribe para realizar todos los metodos antes de realizar la respuesta
		this._getSubscriptionForRoute(req, res, next, props).subscribe({
			next: (respController) => {
				this._doFinalResponse({ req, res, respController, props });
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

	/**
	 * ? Devuelve la subscripcion para realizar las consultas de las rutas
	 * @private
	 * @param {Request} req
	 * @param {Response} res
	 * @param {NextFunction} next
	 * @param {RoutesProps} props
	 * @returns {Observable<any>}
	 */
	private _getSubscriptionForRoute(
		req: Request,
		res: Response,
		next: NextFunction,
		props: RoutesProps
	): Observable<any> {
		const {
			modelController = async () => {},
			coreController,
			hasJwtValidator = true,
			hasAdminValidator = true,
			hasSameUserValidator = true,
		} = props;

		return from(
			//* Comprobamos si el JSON Web Token es valido
			hasJwtValidator || hasAdminValidator
				? from(validateJWT(req))
				: of({ ok: true, id: undefined })
		).pipe(
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
				const capturedError = this._getCaughtError(error);
				return of(capturedError);
			})
		);
	}

	/**
	 * ? Pasandole un error capturado lo convierte en un objeto con los datos a mostrar en la response en caso de error
	 * @private
	 * @param {*} error
	 * @returns {{
			error: any;
			status_code: number;
		}}
	 */
	private _getCaughtError(error: any): {
		error: any;
		status_code: number;
	} {
		let finalError: any = {};
		if (!error.message) {
			finalError = {
				message: error,
				data: {},
			};
		} else finalError = error;
		finalError.reason = error.reason || 'internal error';
		return {
			error: finalError,
			status_code: finalError.status_code || 500,
		};
	}

	/**
	 * ? Realiza la respuesta final
	 * @private
	 * @param {{
			req: Request;
			res: Response;
			respController: any;
			type: TypeRequest;
		}} data
	 */
	private _doFinalResponse(data: {
		req: Request;
		res: Response;
		respController: any;
		props: RoutesProps;
	}): void {
		const { req, res, respController, props } = data;
		const { type } = props;

		const logType = type?.toUpperCase() as LogType;
		const hasData =
			typeof respController?.data === 'boolean' ||
			!!respController?.data ||
			typeof respController?.model === 'boolean' ||
			!!respController?.model;
		//* Si la respuesta de los controladores, contiene errores...
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
	}
}
