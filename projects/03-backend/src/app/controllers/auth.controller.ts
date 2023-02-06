import { Request } from 'express';
import { getNotFoundMessage } from '../helpers/get-model-section.helper';
import { UserModel } from '../models/mongo-models/user.model';
import bcrypt from 'bcryptjs';
import { createJWT } from '../helpers/json-web-token.helper';

/**
 * ? Controladores especificos de los metodos para el modelo de usuarios
 * @type {{
	login: (req: Request) => Promise<any>;
}}
 */
export const authController: {
	login: (req: Request) => Promise<any>;
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
		createJWT(userDB.id);

		return { ok: true, status_code: 200 };
	},
};
