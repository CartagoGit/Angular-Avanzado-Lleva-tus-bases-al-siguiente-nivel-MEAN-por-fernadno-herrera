import { Response, Request } from 'express';
import { LogType } from '../interfaces/logs.interfaces';
import { getCapitalize, log, logError } from './logs.helper';
import { DefaultResponseProps } from '../interfaces/response.interface';
import { ErrorData } from '../models/error-data.model';
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
	respController: Response,
	logType: LogType = 'LOG',
	statusCode: number = 200
): void => {
	const method = getMethodFromUrl(req).toUpperCase();
	const message =
		`[ Status  ${statusCode} OK - ${method} in ${getSectionFromUrl(
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
	const method = getMethodFromUrl(req).toUpperCase();
	const message =
		`[ ERROR -  Status  ${statusCode} - ${method} in ${getSectionFromUrl(
			req
		)} ]`.toUpperCase();
	logError(error.message, logType, message);
	res.status(statusCode).json({
		message,
		ok: false,
		status_code: (error as ErrorData).status_code || statusCode,
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
export const rootResponse = async (
	title: string,
): Promise<unknown> => {
	const message = `${getCapitalize(title)} collection root path`;
	return {
		message,
		ok: true,
		mode: config.MODE,
		status_code: 200,
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
	requisites: { unique?: boolean; required?: boolean; formated?: boolean } = {
		unique: false,
		required: false,
		formated: false,
	}
): string => {
	const { required, formated, unique } = requisites;
	const listRequisites: string[] = [];
	!!required && listRequisites.push('is required');
	!!formated && listRequisites.push('must be formated');
	!!unique && listRequisites.push('must be unique');
	return `Param '${key}' ${new Intl.ListFormat('en-GB').format(
		listRequisites
	)}`;
};

export const getMessageInfoNotModify = (key: string): string => {
	return `The param '${key}' cannot be modify`;
};

export const removeParamAndSetInfo = (req: Request, key: string): void => {
	delete req.body[key];
	req.body.info = { ...req.body.info, [key]: getMessageInfoNotModify(key) };
};
