import { Response, Request } from 'express';
import { LogType } from '../interfaces/logs.interfaces';
import { log, logError } from './logs.helper';
import { DefaultResponseProps } from '../interfaces/response.interface';
import { ErrorData } from '../models/error-data.model';
import { getCapitalize } from './get-capitalize.helper';
import { mongoState } from '../db/init-mongo';
import { config } from '../../environments/config';
import { getSectionFromUrl } from './get-model-section.helper';

export const defaultResponse = (
	req: Request,
	res: Response,
	respController : Response,
	logType: LogType = 'LOG',
	statusCode: number = 200
): void => {
	console.log(req.body);
	console.log(respController);

	res.status(statusCode).json(respController)

	log('Correct response', logType);
};

export const defaultErrorResponse = (
	req: Request,
	res: Response,
	error: ErrorData,
	logType: LogType = 'LOG',
	statusCode: number = 500
) => {
	logError(
		error.message,
		logType,
		`[ Status  ${statusCode} ]`,
		getSectionFromUrl(req)
	);
	return res.status(statusCode).json({
		message: `[ ERROR - ${logType.toUpperCase()} in ${getSectionFromUrl(
			req
		)} ]`.toUpperCase(),
		ok: false,
		status_code: (error as ErrorData).status_code || statusCode,
		error_message: error.message || 'Unknown Error',
		// error_data: { keyValue: error.keyValue },
		error_data: error,
	} as DefaultResponseProps);
};

export const rootResponse = async (title: string, res: Response) => {
	const message = `${getCapitalize(title)} collection root path`;
	return {
		message,
		ok: true,
		mode: config.MODE,
		status_code: 200,
		db_state: mongoState.getState(),
	} as DefaultResponseProps;
};

export const getErrorUniqueParam = (param: {}): ErrorData => {
	const [key, value] = Object.entries(param)[0];
	return new ErrorData({
		message: getStringErrorUniqueParam(param),
		status_code: 409,
		keyValue: { param: key, value },
		reason: 'unique',
	});
};

export const getStringErrorInitParam = (param: {}) => {
	const [key, value] = Object.entries(param)[0];
	return `Param '${key}' with value '${value}'`;
};

export const getStringErrorRequiredParam = (param: string | {}): string => {
	if (typeof param === 'string') param = { [param]: undefined };
	const value = Object.values(param)[0];
	const required = !!value ? `with value '${value}'` : `is required`;
	return `${required}`;
};

export const getStringErrorUniqueParam = (param: {}): string => {
	return `${getStringErrorInitParam(
		param
	)} exists in DB. That param must be unique`;
};

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
