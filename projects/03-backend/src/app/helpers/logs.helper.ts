import { LogType } from '../interfaces/logs.interfaces';
import { QueryOptions } from '../interfaces/query.interface';

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
	query?: Record<string, any> & { options?: QueryOptions<any> };
}): string => {
	let { error, logType = 'LOG', optionalMessage, collection, query } = data;
	const { options, ...params } = query || {};
	const { showQuery, showParams, showOptions } = options || {};

	!error && (error = 'Unknown Error');
	const errorMessage = `[ ERROR - ${logType.toUpperCase()} ${
		!!collection ? ('in ' + collection + ' ').toUpperCase() : ''
	}] :
	Some error stopped the app. Contact with administrator.
	${optionalMessage ? optionalMessage + ' - ' + error : error}`;
	console.error(errorMessage);
	//* Mostrar mensajes opciones
	if (showQuery) console.log('<Query Params>'.toUpperCase(), query);
	if (showParams) console.log('<Model Params>'.toUpperCase(), params);
	if (showOptions) console.log('<Options Params>'.toUpperCase(), options);
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
	query?: Record<string, any> & { options?: QueryOptions<any> };
}): string => {
	const { msg, logType = 'LOG', optionalMessage, query } = data;
	const { options, ...params } = query || {};
	const { showQuery, showParams, showOptions } = options || {};

	const message = `[ ${logType} ] : ${
		optionalMessage ? optionalMessage + ' - ' + msg : msg
	}`;
	console.log(message);

	//* Mostrar mensajes opciones
	if (showQuery) console.log('<Complete Query>'.toUpperCase(), query);
	if (showParams) console.log('<Query Params>'.toUpperCase(), params);
	if (showOptions) console.log('<Options Params>'.toUpperCase(), options);
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
