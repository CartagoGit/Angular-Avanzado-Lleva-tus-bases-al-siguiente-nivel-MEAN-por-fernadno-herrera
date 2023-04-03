import { Roles } from '../roles.interface';
import { Pagination } from './pagination.interface';
import { TypeRequest } from './log-types.interface';

/**
 * ? Default response from DB
 * @export
 * @interface DefaultResponse
 * @typedef {DefaultResponse}
 * @template T
 */
export interface DefaultResponse<T = unknown> {
	ok: boolean;
	message: string;
	status_code: number;
	mode?: 'development' | 'production';
	data?: T;
	data_before?: T;
	model?: T;
	db_state?: 'Connected' | 'Disconnected';
	id?: string;
	method?: TypeRequest;
	role?: Roles;
	token?: string;
	google?: DataFromGoogle;
	isNewUser?: boolean;
	pagination?: Pagination;
}

/**
 * ? Datos recibidos desde el login de google
 * @export
 * @interface DataGoogle
 * @typedef {DataGoogle}
 */
export interface DataFromGoogle {
	token: string;
	userId: string;
	data: DataAccountGoogle;
	completeName: string;
	email: string;
	image: string;
}

/**
 * ? Datos exactos de la cuenta  de usuario de la respuesta del login de google
 */
export interface DataAccountGoogle {
	iss: string;
	nbf: number;
	aud: string;
	sub: string;
	email: string;
	email_verified: boolean;
	azp: string;
	name: string;
	picture: string;
	given_name: string;
	family_name: string;
	iat: number;
	exp: number;
	jti: string;
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
	reason: ErrorReasons;
	keyValue?: any;
}

//* Tipos de razones para que la respuesta sea un error
export type ErrorReasons =
	| 'email or password incorrect'
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
	| 'internal error'
	| 'cannot google user'
	| 'cannot delete yourself';
