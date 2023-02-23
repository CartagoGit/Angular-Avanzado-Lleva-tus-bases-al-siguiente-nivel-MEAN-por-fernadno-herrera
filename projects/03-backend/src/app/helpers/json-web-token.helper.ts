import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../environments/config';
import { basicError } from '../models/error-data.model';

/**
 * ? Crea un Json web Token de un payload
 * @param {{
	id: string;
}} payload
 * @returns {Promise<{ error: boolean; error_message?: string; token?: string }>}
 */
export const createJWT = (payload: {
	id: string;
}): Promise<{ ok: boolean; error_message?: string; token?: string }> => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			config.JWT_SECRET,
			{ expiresIn: '12h' },
			(error, token) => {
				if (error) reject('Had an error creating JSON Web Token');
				resolve({ token, ok: true });
			}
		);
	});
};

/**
 * ? Comprueba si el JSON Web Token es valido
 * @param {Request} req
 * @returns {boolean}
 */
export const validateJWT = async (
	req: Request
): Promise<{ ok: boolean; id: string, token: string }> => {
	//* Leer el token bearer
	// const token = req.header('jwt');
	const token = getTokenFromAuthorization(req);

	let isOk: boolean = false;
	let id: string = '';
	//* Verificamos si el token es correcto segun la clave secreta
	jwt.verify(token!, config.JWT_SECRET, (error, payload) => {
		if (error) return;
		isOk = true;
		id = (payload as { id: string }).id;
	});
	return { ok: isOk, id, token };
};

/**
 * ? Retorna el payload del token JWT sin verificarlo
 * @param {Request} req
 * @returns {{ id: string }}
 */
export const getPayloadFromJwtWithoutVerifiy = (
	req: Request
): { id: string } => {
	const token = getTokenFromAuthorization(req);
	return jwt.decode(token) as { id: string };
};

/**
 * ? Recupera el Token de la cabecera de autorizacion
 * @param {Request} req
 * @returns {string}
 */
export const getTokenFromAuthorization = (req: Request): string => {
	const authorization = req.header('authorization');
	if (!authorization) throw getErrorJWT();
	return getTokenFromBearerHeader(authorization);
};

/**
 * ? Recupera el token Bearer del Header y extrae el token
 * @param {string} authorization
 * @returns {string}
 */
export const getTokenFromBearerHeader = (authorization: string): string =>
	authorization.split(' ')[1];

/**
 * ? Retorna el objeto con el error cuando el JSON Web Token es incorrecto
 * @returns {basicError}
 */
export const getErrorJWT = (): basicError => {
	return {
		message:
			'Incorrect JSON Web Token. Must be Authenticated to access. Relog in the app if the authenticated time expired',
		status_code: 401,
		reason: 'invalid jwt',
	};
};
