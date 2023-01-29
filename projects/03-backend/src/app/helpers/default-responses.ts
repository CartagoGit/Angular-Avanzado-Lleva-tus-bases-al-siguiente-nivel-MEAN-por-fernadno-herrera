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
			const { model, data, message, ...rest } = value;
			if ((!data && !model) || model?.length === 0 || data?.length === 0)
				statusCode = 404;

			res.status(statusCode).json({
				message: `[ ${getSectionFromUrl(req)} - ${
					message || 'OK'
				} ]`.toUpperCase(),
				ok: true,
				status_code: statusCode,
				data,
				model,
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

export const getErrorUniqueParam = (param: {}): ErrorData => {
	const [key, value] = Object.entries(param)[0];
	return new ErrorData({
		message: `Param '${key}' with value '${value}' exists in DB. That param must be unique`,
		status_code: 409,
		keyValue: param,
		reason: 'unique',
	});
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
