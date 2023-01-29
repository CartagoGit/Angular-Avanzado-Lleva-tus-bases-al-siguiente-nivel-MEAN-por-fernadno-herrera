import { Response } from 'express';
import { LogType } from '../interfaces/logs.interfaces';
import { logError } from './logs.helper';

export const defaultErrorResponse = (
	res: Response,
	error: Error,
	logType: LogType = 'LOG',
	statusCode: number = 500
): string => {
	res.status(statusCode).json({
		ok: false,
		status_code: statusCode,
		message: '[ ERROR ]',
		error: error.message,
		error_data: error,
	});

	return logError(error.message, logType);
};
