import { Response, Request } from 'express';
import { from, Subscription } from 'rxjs';
import { LogType } from '../interfaces/logs.interfaces';
import { logError } from './logs.helper';
import { DefaultResponseProps } from '../interfaces/response.interface';
import { getSectionFromUrl } from './get-section-from-url.helper';
import { ErrorData } from '../models/error-data.model';
import { getCapitalize } from './get-capitalize.helper';
import { mongoState } from '../db/init-mongo';
import { config } from '../../environments/config';

export const defaultResponse = (
	res: Response,
	req: Request,
	callback: () => Promise<any>,
	logType: LogType = 'LOG',
	statusCode: number = 200
): Subscription => {
	return from(callback()).subscribe({
		next: (value: any) => {
			const {
				model = undefined,
				data = undefined,
				message = 'OK',
				...rest
			} = value;

			let ok = true;
			let error_message: string | undefined = undefined;
			if (value.error_message) {
				statusCode = 404;
				ok = false;
				error_message = value.error_message;
			} else if (
				(!data && !model) ||
				model?.length === 0 ||
				data?.length === 0
			) {
				statusCode = 404;
				ok = false;
				error_message = 'Not found'.toUpperCase();
			}
			res.status(statusCode).json({
				message: `[ ${getSectionFromUrl(req)} - ${message} ]`.toUpperCase(),
				ok,
				status_code: statusCode,
				data,
				model,
				error_message,
				...rest,
			} as DefaultResponseProps);
		},
		error: (error) => {
			defaultErrorResponse(res, req, error as ErrorData, logType);
		},
	});
};

export const defaultErrorResponse = (
	res: Response,
	req: Request,
	error: ErrorData,
	logType: LogType = 'LOG',
	statusCode: number = 500
): string => {
	res.status(statusCode).json({
		message: `[ ${getSectionFromUrl(
			req
		)} - ERROR IN ${logType}]`.toUpperCase(),
		ok: false,
		status_code: (error as ErrorData).status_code || statusCode,
		error_message: error.message || 'Unknown Error',
		// error_data: { keyValue: error.keyValue },
		error_data: error,
	} as DefaultResponseProps);

	return logError(error.message, logType, `[ Status  ${statusCode} ]`);
};

export const rootResponse = (title: string, res: Response) => {
	const message = `${getCapitalize(title)} collection root path`;
	return res.json({
		message,
		ok: true,
		mode: config.MODE,
		status_code: 200,
		db_state: mongoState.getState(),
	} as DefaultResponseProps);
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
	// const [key, value] = Object.entries(param)[0];
	const { required, formated, unique } = requisites;
	const listRequisites: string[] = [];
	!!required && listRequisites.push('is required');
	!!formated && listRequisites.push('must be formated');
	!!unique && listRequisites.push('must be unique');
	return `Param '${key}' ${new Intl.ListFormat('en-GB').format(
		listRequisites
	)}`;
};
