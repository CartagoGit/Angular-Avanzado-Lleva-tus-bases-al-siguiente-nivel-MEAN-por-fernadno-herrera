import jwt from 'jsonwebtoken';
import { config } from '../../environments/config';

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
