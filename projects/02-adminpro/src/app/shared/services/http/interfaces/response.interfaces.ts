/**
 * ? Default response from DB
 * @export
 * @interface DefaultResponse
 * @typedef {DefaultResponse}
 */
export interface DefaultResponse {
	ok: boolean;
	message: string;
	status_code: number;
	mode?: 'development' | 'production';
	data?: any;
	model?: any;
	db_state?: string;
}
