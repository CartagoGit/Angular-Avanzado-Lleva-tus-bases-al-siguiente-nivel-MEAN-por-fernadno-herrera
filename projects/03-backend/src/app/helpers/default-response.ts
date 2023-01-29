import { Response, Request } from 'express';
import { from, Subscription } from 'rxjs';
import { LogType } from '../interfaces/logs.interfaces';
import { logError } from './logs.helper';
import { DefaultResponseProps } from '../interfaces/response.interface';
import { getSectionFromUrl } from './get-section-from-url.helper';

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
			defaultErrorResponse(res, req, error as Error, logType);
		},
	});
};

export const defaultErrorResponse = (
	res: Response,
	req: Request,
	error: Error,
	logType: LogType = 'LOG',
	statusCode: number = 500
): string => {
	res.status(statusCode).json({
		message: `[ ${getSectionFromUrl(req)} - ERROR ]`.toUpperCase(),
		ok: false,
		status_code: statusCode,
		error_message: error.message,
		error_data: error,
	} as DefaultResponseProps);

	return logError(error.message, logType, `[ Status  ${statusCode} ]`);
};
