import { Roles } from '../../../interfaces/roles.interface';

/**
 * ? Default response from DB
 * @export
 * @interface DefaultResponse
 * @typedef {DefaultResponse}
 */
export interface DefaultResponse<T = unknown> {
	ok: boolean;
	message: string;
	status_code: number;
	mode?: 'development' | 'production';
	data?: T;
	model?: T;
	db_state?: string;
	id?: string;
	method?: string;
	role?: Roles;
	token?: string;
}

/**
 * ? Interfaz de respuesta Erronea
 * @export
 * @interface DefaulErrorResponse
 * @typedef {DefaulErrorResponse}
 */
export interface DefaultErrorResponse {
	message: string;
	ok: boolean;
	status_code: number;
	error_message: string;
	error_data: ErrorData;
	db_state: string;
	trace: Record<string, any>[];
}

/**
 * ? Interfaz de la data del error
 * @export
 * @interface ErrorData
 * @typedef {ErrorData}
 */
export interface ErrorData {
	status_code: number;
	reason: string;
	keyValue?: any;
}

//* Tipos de razones para que la respuesta sea un error
export type ErrorReasons =
	| 'invalid params'
	| 'unique'
	| 'admin required'
	| 'not fields in body'
	| 'not params in url'
	| 'model not found'
	| 'not valid id'
	| 'invalid type file'
	| 'not found file'
	| 'not found id in model'
	| 'bad format extension'
	| 'cannot upload files'
	| 'cannot delete files'
	| 'file not found'
	| 'bad token'
	| 'invalid jwt'
	| 'validation'
	| 'not same user'
	| 'not id in params'
	| 'not found'
	| 'internal error';
