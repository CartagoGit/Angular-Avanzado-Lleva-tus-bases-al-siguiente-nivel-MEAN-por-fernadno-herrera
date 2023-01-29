export class ErrorData extends Error {
	public status_code;
	public keyValue;
	constructor(data: { message: string; status_code: number; keyValue: {} }) {
		super(data.message);
		this.status_code = data.status_code;
		this.keyValue = data.keyValue;
	}
}
