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
	constructor(data: {
		message: string;
		status_code: number;
		keyValue: {} | [];
		reason: string | string[];
	}) {
		super(data.message);
		this.status_code = data.status_code;
		this.keyValue = data.keyValue;
		this.reason = data.reason;
	}
}
