import { Response, Request } from 'express';
import { LogType } from '../interfaces/logs.interfaces';
import { getCapitalize, log, logError } from './logs.helper';
import { DefaultResponseProps } from '../interfaces/response.interface';
import { basicError, ErrorData } from '../models/error-data.model';
import { mongoState } from '../db/init-mongo';
import { config } from '../../environments/config';
import {
	getMethodFromUrl,
	getSectionFromUrl,
} from './get-model-section.helper';

/**
 * ? Crea una response predefinida y un log para mostrar los mensajes correctos
 * @param {Request} req
 * @param {Response} res
 * @param {Response} respController
 * @param {LogType} [logType='LOG']
 * @param {number} [statusCode=200]
 */
export const defaultResponse = (
	req: Request,
	res: Response,
	respController: any,
	logType: LogType = 'LOG',
	statusCode: number = 200
): void => {
	const method =
		getMethodFromUrl(req).toUpperCase().split('-').join(' ') || undefined;
	const message =
		respController.message ||
		`[ Status  ${statusCode} OK - '${method}' in ${getSectionFromUrl(
			req
		)} ]`.toUpperCase();
	res.status(statusCode).json({
		...respController,
		ok: true,
		message,
		method,
		db_state: mongoState.getState(),
	});
	log('Correct response', logType, message);
};

/**
 * ? Crea una response predefinida y un log para mostrar los errores producidos en las peticiones
 * @param {Request} req
 * @param {Response} res
 * @param {ErrorData} error
 * @param {LogType} [logType='LOG']
 * @param {number} [statusCode=500]
 */
export const defaultErrorResponse = (
	req: Request,
	res: Response,
	error: ErrorData,
	logType: LogType = 'LOG',
	statusCode: number = 500
) => {
	const method = getMethodFromUrl(req).toUpperCase().split('-').join(' ');
	statusCode = error.status_code || statusCode;
	const message =
		`[ ERROR -  Status  ${statusCode} - '${method}' in ${getSectionFromUrl(
			req
		)} ]`.toUpperCase();
	logError(error.message, logType, message);
	res.status(statusCode).json({
		message,
		ok: false,
		status_code: statusCode,
		error_message: error.message || 'Unknown Error',
		error_data: error,
		db_state: mongoState.getState(),
	} as DefaultResponseProps);
};

/**
 * ? Crea una respuesta a la peticion a las rutas base de las colecciones
 * @async
 * @param {string} title
 * @returns {unknown}
 */
export const rootResponse = async (title: string): Promise<unknown> => {
	const message = `${getCapitalize(title)} collection root path`;
	return {
		message,
		ok: true,
		mode: config.MODE,
		status_code: 200,
		data: 'Root Path',
		db_state: mongoState.getState(),
	} as DefaultResponseProps;
};

/**
 * ? Crea una respuesta de error para parametros que deban ser unicos
 * @param {{}} param
 * @returns {ErrorData}
 */
export const getErrorUniqueParam = (param: {}): ErrorData => {
	const [key, value] = Object.entries(param)[0];
	return new ErrorData({
		message: getStringErrorUniqueParam(param),
		status_code: 409,
		keyValue: { param: key, value },
		reason: 'unique',
	});
};

/**
 * ? Devuelve la iniciacion de un parametro con su valor en texto
 * @param {{}} param
 * @returns {string}
 */
export const getStringErrorInitParam = (param: {}) => {
	const [key, value] = Object.entries(param)[0];
	return `Param '${key}' with value '${value}'`;
};

/**
 * ? Devuelve el mensaje de error si un parametro es requerido
 * @param {(string | {})} param
 * @returns {string}
 */
export const getStringErrorRequiredParam = (param: string | {}): string => {
	if (typeof param === 'string') param = { [param]: undefined };
	const value = Object.values(param)[0];
	const required = !!value ? `with value '${value}'` : `is required`;
	return `${required}`;
};

/**
 * ? Devuelve el mensaje de error si un parametro es unico
 * @param {{}} param
 * @returns {string}
 */
export const getStringErrorUniqueParam = (param: {}): string => {
	return `${getStringErrorInitParam(
		param
	)} exists in DB. That param must be unique`;
};

/**
 * ? crea el mensaje de error a devolver segun el tipo de validaciones de los parametros
 * @param {string} key
 * @param {{ unique?: boolean; required?: boolean; formated?: boolean }} [requisites={
		unique: false,
		required: false,
		formated: false,
	}]
 * @returns {string}
 */
export const getMessageErrorValidation = (
	key: string,
	requisites: {
		unique?: boolean;
		required?: boolean;
		formated?: boolean;
		mongoId?: boolean;
		array?: boolean;
	} = {
		unique: false,
		required: false,
		formated: false,
		mongoId: false,
		array: false,
	}
): string => {
	const { required, formated, unique, mongoId, array } = requisites;
	const listRequisites: string[] = [];
	!!required && listRequisites.push('is required');
	!!formated && listRequisites.push('must be formated');
	!!unique && listRequisites.push('must be unique');
	!!mongoId && listRequisites.push('must be a valid Mongo Object Id');
	!!array && listRequisites.push('must be an Array');
	return `Param '${key}' ${new Intl.ListFormat('en-GB').format(
		listRequisites
	)}`;
};

/**
 * ? Devuelve el error si se necesario ser admin
 * @returns {basicError}
 */
export const getErrorNotAdmin = (): basicError => {
	return {
		message: 'Must be Admin to use this route',
		status_code: 401,
		reason: 'admin required',
	} as basicError;
};

/**
 * ? Devuelve el mensaje de error cuando no existen campos en el body
 * @param {('modify' | 'add' | 'remove')} [typeModifyFields='modify']
 * @returns {basicError}
 */
export const getErrorNotFields = (
	typeModifyFields: 'modify' | 'add' | 'remove' = 'modify'
): basicError => {
	return {
		message: `There are not fields to ${typeModifyFields} in body request`,
		status_code: 400,
		reason: 'no fields in body',
	};
};

/**
 * ? Devuelve mensaje informando que el parametro no puede ser modificado
 * @param {string} key
 * @returns {string}
 */
export const getMessageInfoNotModify = (key: string): string => {
	return `The param '${key}' cannot be modify`;
};

/**
 * ? Elimina la informacion del parametro y añade informacion notificando que el parametro no puede ser  modificado
 * @param {Request} req
 * @param {string} key
 */
export const removeParamAndSetInfo = (req: Request, key: string): void => {
	delete req.body[key];
	req.body.info = { ...req.body.info, [key]: getMessageInfoNotModify(key) };
};
