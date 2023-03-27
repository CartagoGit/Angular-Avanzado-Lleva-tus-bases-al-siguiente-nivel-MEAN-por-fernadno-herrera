import { LogType } from '../interfaces/logs.interfaces';

/**
 * ? Crea un mensaje de error para mostrar en el log
 * @param {{
	error: string;
	logType: LogType;
	optionalMessage?: string;
	collection?: string;
	query?: object;
}} data
 * @returns {string}
 */
export const logError = (data: {
	error: string;
	logType: LogType;
	optionalMessage?: string;
	collection?: string;
	query?: object;
}): string => {
	let { error, logType = 'LOG', optionalMessage, collection, query } = data;
	!error && (error = 'Unknown Error');
	const errorMessage = `[ ERROR - ${logType.toUpperCase()} ${
		!!collection ? ('in ' + collection + ' ').toUpperCase() : ''
	}] :
	Some error stopped the app. Contact with administrator.
	${optionalMessage ? optionalMessage + ' - ' + error : error}`;
	console.error(errorMessage);
	if (query) console.error('<Query Params>'.toUpperCase(), query);
	return errorMessage;
};

/**
 * ? Crea un mensaje de log predefinido
 * @param {{
	msg: string;
	logType?: LogType;
	optionalMessage?: string;
	query?: object;
}} data
 * @returns {string}
 */
export const log = (data: {
	msg: string;
	logType?: LogType;
	optionalMessage?: string;
	query?: object;
}): string => {
	const { msg, logType = 'LOG', optionalMessage, query } = data;
	const message = `[ ${logType} ] : ${
		optionalMessage ? optionalMessage + ' - ' + msg : msg
	}`;
	console.log(message);
	if (query) console.log('<Query Params>'.toUpperCase(), query);
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
