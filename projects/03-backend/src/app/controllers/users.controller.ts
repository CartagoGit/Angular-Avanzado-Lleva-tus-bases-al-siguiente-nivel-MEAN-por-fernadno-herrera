import { Request } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/mongo-models/user.model';
import { removeParamAndSetInfo } from '../helpers/default-responses';
import { cleanValidatorField } from '../helpers/validator.helper';
import { getNotFoundMessage } from '../helpers/get-model-section.helper';

/**
 * ? Controladores especificos de los metodos para el modelo de usuarios
 * @type {{
	post: (req: Request) => Promise<any>;
	put: (req: Request) => Promise<any>;
}}
 */
export const usersController: {
	post: (req: Request) => Promise<any>;
	put: (req: Request) => Promise<any>;
} = {
	post: async (req) => {
		//* Encriptamos la contraseña
		const { password } = req.body;
		const salt = bcrypt.genSaltSync();
		req.body.password = bcrypt.hashSync(password, salt);
		return req.body;
	},
	put: async (req) => {
		//* Condicionamos las respuestas a sus validadores y eliminamos las que no deban modificarse
		const userDB = await UserModel.findById(req.params['id']);
		if (!userDB) throw { message: getNotFoundMessage(req), status_code: 404 };
		// req.body['model'] = userDB;
		if (userDB.email === req.body.email) {
			cleanValidatorField(req, 'email');
			delete req.body.email;
		}

		if (req.body.role && userDB.role !== 'ADMIN_ROLE') {
			removeParamAndSetInfo(req, 'role');
			req.body.info.role += ' if you have not ADMIN_ROLE';
		}
		if (req.body.google) removeParamAndSetInfo(req, 'google');

		return req.body;
	},
};
