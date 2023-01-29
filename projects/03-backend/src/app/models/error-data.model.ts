export class ErrorData extends Error {
	public status_code;
	public keyValue;
	public reason: string;
	constructor(data: { message: string; status_code: number; keyValue: {}, reason: string }) {
		super(data.message);
		this.status_code = data.status_code;
		this.keyValue = data.keyValue;
		this.reason = data.reason;
	}
}
