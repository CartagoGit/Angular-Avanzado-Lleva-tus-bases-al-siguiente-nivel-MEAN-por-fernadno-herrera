import { Response } from 'express';
import { from, Subscription } from 'rxjs';
import { LogType } from '../interfaces/logs.interfaces';
import { logError } from './logs.helper';

export const defaultResponse = (
	res: Response,
	callback: () => Promise<any>,
	logType: LogType = 'LOG',
	statusCode: number = 200
): Subscription => {
	return from(callback()).subscribe({
		next: (value: any) => {
			res.status(statusCode).json({
				message: `[ ${value.message} ]` || '[ OK ]',
				ok: true,
				status_code: statusCode,
				data: value.model,
			});
		},
		error: (error) => {
			defaultErrorResponse(res, error as Error, logType);
		},
	});
};

export const defaultErrorResponse = (
	res: Response,
	error: Error,
	logType: LogType = 'LOG',
	statusCode: number = 500
): string => {
	res.status(statusCode).json({
		message: '[ ERROR ]',
		ok: false,
		status_code: statusCode,
		error_message: error.message,
		error_data: error,
	});

	return logError(error.message, logType);
};
