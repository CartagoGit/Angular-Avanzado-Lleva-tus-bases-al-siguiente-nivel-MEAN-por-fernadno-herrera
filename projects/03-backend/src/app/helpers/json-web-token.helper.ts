import jwt from 'jsonwebtoken';
import { config } from '../../environments/config';

/**
 * ? Crea un Json web Token de un payload
 * @param {{ id: string }} payload
 */
export const createJWT = (payload: { id: string }) => {
	jwt.sign(payload, config.JWT_SECRET, { expiresIn: '12h' });
};
