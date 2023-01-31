import { LogType } from '../interfaces/logs.interfaces';

export const logError = (
	error: string,
	logType: LogType = 'LOG',
	optionalMessage?: string,
	collection?: string
): string => {
	const errorMessage = `[ ERROR - ${logType.toUpperCase()} ${
		!!collection ? ('in ' + collection + ' ').toUpperCase() : ''
	}] :
	Some error stopped the app. Contact with administrator.
	${optionalMessage ? optionalMessage + ' - ' + error : error}}`;
	console.error(errorMessage);
	return errorMessage;
};

export const log = (
	msg: string,
	logType: LogType = 'LOG',
	optionalMessage?: string
): string => {
	const message = `[ ${logType} ] : ${
		optionalMessage ? optionalMessage + ' - ' + msg : msg
	}`;
	console.log(message);
	return message;
};
