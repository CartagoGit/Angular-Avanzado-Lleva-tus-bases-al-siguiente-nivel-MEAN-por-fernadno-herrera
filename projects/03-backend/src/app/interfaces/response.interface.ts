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

/**
 * ? Datos basicos a devolver en la response
 * @export
 * @typedef {ReturnDataResponse}
 */
export type ResponseReturnData = {
	status_code: number;
	data?: any;
	data_before?: any;
	model?: any;
	queryParams?: any;
	modelParams?: any;
	include?: boolean;
	id?: string;
} & { [key in string]: any };
