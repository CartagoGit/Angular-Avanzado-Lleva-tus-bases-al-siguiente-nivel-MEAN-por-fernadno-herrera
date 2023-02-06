import { Request } from 'express';
import { getNotFoundMessage } from '../helpers/get-model-section.helper';
import { UserModel } from '../models/mongo-models/user.model';
import bcrypt from 'bcryptjs';

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

		const validPassword = bcrypt.compareSync(password, userDB.password);
		if (!validPassword) throw errorMsg;

		return { ok: true, status_code: 200 };
	},
};
