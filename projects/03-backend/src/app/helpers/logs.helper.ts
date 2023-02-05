import { LogType } from '../interfaces/logs.interfaces';

/**
 * ? Crea un mensaje de error para mostrar en el log
 * @param {string} error
 * @param {LogType} [logType='LOG']
 * @param {?string} [optionalMessage]
 * @param {?string} [collection]
 * @returns {string}
 */
export const logError = (
	error: string,
	logType: LogType = 'LOG',
	optionalMessage?: string,
	collection?: string
): string => {
	!error && (error = 'Unknown Error');
	const errorMessage = `[ ERROR - ${logType.toUpperCase()} ${
		!!collection ? ('in ' + collection + ' ').toUpperCase() : ''
	}] :
	Some error stopped the app. Contact with administrator.
	${optionalMessage ? optionalMessage + ' - ' + error : error}`;
	console.error(errorMessage);
	return errorMessage;
};

/**
 * ? Crea un mensaje de log predefinido
 * @param {string} msg
 * @param {LogType} [logType='LOG']
 * @param {?string} [optionalMessage]
 * @returns {string}
 */
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

/**
 * ? Devuelve un texto capitalizado
 * @param {string} text
 * @returns {string}
 */
export const getCapitalize = (text: string): string => {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
