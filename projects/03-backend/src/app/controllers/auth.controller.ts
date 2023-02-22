import { Request } from 'express';
import { getNotFoundMessage } from '../helpers/get-model-section.helper';
import { UserModel } from '../models/mongo-models/user.model';
import bcrypt from 'bcryptjs';
import { createJWT } from '../helpers/json-web-token.helper';
import { ResponseReturnData } from '../interfaces/response.interface';

import { config } from '../../environments/config';
import { basicError } from '../models/error-data.model';

/**
 * ? Controladores especificos de los metodos para el modelo de usuarios
 * @type {({
	login: (
		req: Request
	) => Promise<
		ResponseReturnData & { token: string; ok: boolean; id: string }
	>;
	googleLogin: (req: Request) => Promise<ResponseReturnData>;
})}
 */
export const authController: {
	login: (
		req: Request
	) => Promise<
		ResponseReturnData & { token: string; ok: boolean; id: string }
	>;
	googleLogin: (req: Request) => Promise<ResponseReturnData>;
} = {
	login: async (req) => {
		const { password, email } = req.body;
		//* Verificamos el email
		const userDB = await UserModel.findOne({ email });
		const errorMsg = { message: getNotFoundMessage(req), status_code: 404 };
		if (!userDB) throw errorMsg;
		//* Verificamos si el password es el del usuario de dicho email
		const validPassword = bcrypt.compareSync(password, userDB.password);
		if (!validPassword) throw errorMsg;

		// * Generamos el Json Web Token
		const id = userDB.id;
		const { ok, token = '' } = await createJWT({ id });

		return { ok, status_code: 200, token, id };
	},
	googleLogin: async (req) => {
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

		const {
			sub: userId,
			email,
			family_name,
			given_name,
			picture: image,
		} = payload;
		// If request specified a G Suite domain:
		// const domain = payload['hd'];

		return {
			status_code: 200,
			data: req.body,
			userId,
			email,
			name: `${given_name} ${family_name}`,
			image,
			googleUser: payload,
		};
	},
};
