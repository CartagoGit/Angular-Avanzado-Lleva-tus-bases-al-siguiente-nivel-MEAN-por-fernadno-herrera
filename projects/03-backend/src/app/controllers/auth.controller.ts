import { Request } from 'express';
import { getNotFoundMessage } from '../helpers/get-model-section.helper';
import { UserModel } from '../models/mongo-models/user.model';
import { createJWT } from '../helpers/json-web-token.helper';
import { ResponseReturnData } from '../interfaces/response.interface';
import { checkGoogleLoginAndGetData } from '../helpers/google-login.helper';
import { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../../environments/config';

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
	googleClientId: (req: Request) => Promise<ResponseReturnData>;
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
		const payload = await checkGoogleLoginAndGetData(req);
		const {
			sub: userId,
			email,
			family_name,
			given_name,
			picture: image,
		} = payload;
		// If request specified a G Suite domain:
		// const domain = payload['hd'];

		//* Creamos el usuario con los datos recibidos de google
		const userDB: Document | null = await UserModel.findOne({ email });
		let user: Document;
		let isNewUser = false;
		if (!userDB) {
			user = new UserModel({
				name: given_name,
				email,
				password: '@@@',
				images: [image],
				google: true,
			});
			isNewUser = true;
		} else {
			user = userDB;
			(user as any).google = true;
		}
		await user.save();

		// * Generamos el Json Web Token
		const id = user.id;
		const { ok, token = '' } = await createJWT({ id });

		return {
			ok,
			jwt: token,
			status_code: 200,
			model: user,
			google: {
				token: req.body.token,
				userId,
				data: payload,
				completeName: `${given_name} ${family_name}`,
				email,
				image,
			},
			isNewUser,
		};
	},
	googleClientId: async (req) => {
		const googleClientId = config.GOOGLE_ID;
		return {
			status_code: 200,
			data: googleClientId,
		};
	},
};
