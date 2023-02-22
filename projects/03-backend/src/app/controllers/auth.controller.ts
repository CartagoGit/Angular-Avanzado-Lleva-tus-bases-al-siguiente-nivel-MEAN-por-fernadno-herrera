import { Request } from 'express';
import { getNotFoundMessage } from '../helpers/get-model-section.helper';
import { UserModel } from '../models/mongo-models/user.model';
import bcrypt from 'bcryptjs';
import { createJWT } from '../helpers/json-web-token.helper';
import { ResponseReturnData } from '../interfaces/response.interface';

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
		return { status_code: 200, data: req.body };
	},
};
