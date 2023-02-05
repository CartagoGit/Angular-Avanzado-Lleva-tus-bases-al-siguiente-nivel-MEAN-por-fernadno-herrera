import { NextFunction, Request, Response } from 'express';

/**
 * ? Tipado para la respuesta predefinida de la api
 * @export
 * @interface DefaultResponseProps
 * @typedef {DefaultResponseProps}
 */
export interface DefaultResponseProps {
	ok: boolean;
	message: string;
	status_code: number;
	data?: unknown;
	model?: unknown;
	error_message?: string;
	error?: Error;
	db_state?: string;
}

/**
 * ? Tipado de las funciones de los middlewares, controladores y metodos para express
 * @export
 * @typedef {CallbackMethod}
 */
export type CallbackMethod = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<any>;

/**
 * ? Tipos de request de express
 * @export
 * @typedef {TypeRequest}
 */
export type TypeRequest = 'get' | 'post' | 'patch' | 'put' | 'delete' | 'use';
