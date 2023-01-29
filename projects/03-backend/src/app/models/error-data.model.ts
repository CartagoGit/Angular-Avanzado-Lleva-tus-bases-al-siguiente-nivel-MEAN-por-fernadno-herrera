export class ErrorData extends Error {
	public status_code;
	public error_param;
	constructor(data: any) {
		super(data.message);
		this.status_code = data.status_code;
		this.error_param = data.error_param;
	}
}
