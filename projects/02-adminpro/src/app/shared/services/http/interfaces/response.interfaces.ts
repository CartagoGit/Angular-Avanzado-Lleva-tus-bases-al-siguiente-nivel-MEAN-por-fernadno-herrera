import { Roles } from '../../../interfaces/roles.interface';

/**
 * ? Default response from DB
 * @export
 * @interface DefaultResponse
 * @typedef {DefaultResponse}
 */
export interface DefaultResponse<T = undefined> {
	ok: boolean;
	message: string;
	status_code: number;
	mode?: 'development' | 'production';
	data?: T;
	model?: T;
	db_state?: string;
	id?: string;
	method?: string;
	role?: Roles;
	token?: string;
}
