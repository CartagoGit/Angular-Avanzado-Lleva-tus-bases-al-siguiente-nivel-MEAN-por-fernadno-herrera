import { ErrorReasons } from '../interfaces/errors.interfaces';

/**
 * ? Interfaz basico de los errores
 * @export
 * @interface basicError
 * @typedef {basicError}
 */
export interface basicError {
	message: string;
	status_code: number;
	reason?: ErrorReasons | ErrorReasons[];
	keyValue?: Record<string, any> | any[];
	data?: any;
}

/**
 * ? Modelo de Error personalizado para la api
 * @export
 * @class ErrorData
 * @typedef {ErrorData}
 * @extends {Error}
 */
export class ErrorData extends Error {
	public status_code;
	public keyValue;
	public reason;
	constructor(data: basicError) {
		super(data.message);
		this.status_code = data.status_code;
		this.keyValue = data.keyValue;
		this.reason = data.reason;
	}
}
