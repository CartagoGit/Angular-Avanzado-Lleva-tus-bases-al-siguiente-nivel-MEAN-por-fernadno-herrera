import { Role } from "./roles.interface";


/**
 * ? Interfaz de la respuesta de los Json web Tokens
 * @export
 * @interface ResponseReturnJwt
 * @typedef {ResponseReturnJwt}
 */
export interface ResponseReturnJwt {
	token: string;
	ok: boolean;
	id: string;
	role: Role
}
