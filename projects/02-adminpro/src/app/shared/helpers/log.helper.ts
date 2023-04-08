import { BasicError } from '../interfaces/common/log.interface';
import { getCapitalize } from './../../../../../03-backend/src/app/helpers/logs.helper';

/**
 * ? Basic log error
 * @param {BasicError} data
 */
export const basicLogError = (data: BasicError): void => {
	const { infoObject } = data;
	if (infoObject) console.warn('[ info ]'.toUpperCase(),infoObject);
	console.error(getBasicErrorMessage(data));
};

/**
 * ? Basic throw error
 * @param {BasicError} data
 */
export const basicThrowError = (data: BasicError): never => {
	const { infoObject } = data;
	if (infoObject) console.warn('[ info ]'.toUpperCase(),infoObject);
	throw new Error(getBasicErrorMessage(data));
};

/**
 * ? Crea el error de mensaje basico
 * @param {BasicError} data
 * @returns {string}
 */
export const getBasicErrorMessage = (data: BasicError): string => {
	const { message, methodName, className, line, file, reason, infoObject } =
		data;
	return `[ ${(className ? className : 'error').toUpperCase()}${(methodName
		? ' in ' + methodName
		: ''
	).toUpperCase()} ]
	${getCapitalize(
		message ? message : 'without explicit message'
	)}
	${reason ? ' - Reason: ' + getCapitalize(reason) : ''}${
		line ? ' - Line: ' + line : ''
	}${file ? ' - File: ' + getCapitalize(file) : ''}`;
};
