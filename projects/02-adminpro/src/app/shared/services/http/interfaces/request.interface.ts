/**
 * ? Respuesta default para el body de peticiones al Auth
 * @export
 * @interface UserDefaultResponse
 * @typedef {UserDefaultResponse}
 */
export interface AuthDefaultResponse {
	name?: string;
	password?: string;
	email?: string;
	token?: string;
}
