import { Request } from 'express';
import { getNotFoundMessage } from '../helpers/get-model-section.helper';
import { UserModel } from '../models/mongo-models/user.model';
import { createJWT, validateJWT } from '../helpers/json-web-token.helper';
import { ResponseReturnData } from '../interfaces/response.interface';
import { checkGoogleLoginAndGetData } from '../helpers/google-login.helper';
import { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../../environments/config';
import { ResponseReturnJwt } from '../interfaces/json-web-token.interface';
import { getRandomEncrypt } from '../helpers/encrypt.helper';
import { basicError } from '../models/error-data.model';

/**
 * ? Controladores especificos de los metodos para el modelo de usuarios
 * @type {{
	login: (req: Request) => Promise<ResponseReturnData & ResponseReturnJwt>;
	renewToken: (
		req: Request
	) => Promise<ResponseReturnData & ResponseReturnJwt>;
	googleLogin: (req: Request) => Promise<ResponseReturnData>;
	googleClientId: () => Promise<ResponseReturnData>;
}}
 */
export const authController: {
	login: (req: Request) => Promise<ResponseReturnData & ResponseReturnJwt>;
	renewToken: (
		req: Request
	) => Promise<ResponseReturnData & ResponseReturnJwt>;
	googleLogin: (req: Request) => Promise<ResponseReturnData>;
	googleClientId: () => Promise<ResponseReturnData>;
} = {
	login: async (req) => {
		const { password, email } = req.body;
		//* Verificamos el email
		const userDB = await UserModel.findOne({ email });
		const errorMsg = {
			message: getNotFoundMessage(req),
			status_code: 404,
			reason: 'email or password incorrect',
		} as basicError;
		if (!userDB) throw errorMsg;
		//* Verificamos si el password es el del usuario de dicho email
		const validPassword = bcrypt.compareSync(password, userDB.password);
		if (!validPassword) throw errorMsg;

		// * Generamos el Json Web Token
		const id = userDB.id;
		const { ok, token = '' } = await createJWT({ id });

		return { ok, status_code: 200, token, id, role: userDB.role };
	},
	renewToken: async (req) => {
		const { token: lastToken, id } = await validateJWT(req);
		const userDB = await UserModel.findById(id);
		const { ok, token = '' } = await createJWT({ id });
		return {
			status_code: 200,
			ok,
			id,
			token,
			role: userDB.role,
			user: userDB,
			data: { new_token: token, last_token: lastToken },
		};
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
				password: getRandomEncrypt(),
				images: [image],
				google: true,
			});
			(user as any).user_creator = user.id;
			(user as any).user_modifier = user.id;
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
			token,
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
	googleClientId: async () => {
		const googleClientId = config.GOOGLE_ID;
		return {
			status_code: 200,
			data: googleClientId,
		};
	},
};
