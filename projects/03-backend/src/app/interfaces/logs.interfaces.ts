import { TypeRequest } from './response.interface';


/**
 * ? Crea un tipado para los tipos de logs
 * @export
 * @typedef {LogType}
 */
export type LogType =
	| 'MONGO'
	| 'EXPRESS'
	| 'LOG'
	| 'CRITICAL ERROR'
	| Uppercase<TypeRequest>;
