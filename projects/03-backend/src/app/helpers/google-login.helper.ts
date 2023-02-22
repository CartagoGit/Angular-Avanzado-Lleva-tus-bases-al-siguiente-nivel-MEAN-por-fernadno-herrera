import { Request } from 'express';
import { TokenPayload } from 'google-auth-library';
import { config } from '../../environments/config';
import { basicError } from '../models/error-data.model';

/**
 * ? Realiza las comprobaciones de O2Auth con google
 * @async
 * @param {Request} req
 * @returns {Promise<TokenPayload>}
 */
export const checkGoogleLoginAndGetData = async (req: Request): Promise<TokenPayload> => {
	const { GOOGLE_CLIENT, GOOGLE_ID } = config.GOOGLE_CLIENT;
	const ticket = await GOOGLE_CLIENT.verifyIdToken({
		idToken: req.body.token,
		audience: GOOGLE_ID, // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = !!ticket ? ticket.getPayload() : undefined;
	if (!payload || !ticket) {
		const badToken = !ticket ? 'ticket' : 'payload';
		throw {
			status_code: 401,
			reason: `bad ${badToken} token`,
			message: `The Google Auth Token has a bad ${badToken}`,
		} as basicError;
	}
	return payload;
};
