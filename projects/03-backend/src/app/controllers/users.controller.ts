import { Request } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/mongo/user.model';
import { removeParamAndSetInfo } from '../helpers/default-responses';


export const usersController = {
	post: async (req: Request): Promise<void> => {
		//* Encriptamos la contraseña
		const { password } = req.body;
		const salt = bcrypt.genSaltSync();
		req.body.password = bcrypt.hashSync(password, salt);
	},
	put: async (req: Request): Promise<void> => {
		const userDB = await UserModel.findById(req.params['id']);
		if (!userDB) throw 'There are not user with that id';
		if (userDB.email === req.body.email) delete req.body.email;


		if (req.body.password) removeParamAndSetInfo(req, 'password');
		if (req.body.google) removeParamAndSetInfo(req, 'google');

	},
};
