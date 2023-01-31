import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { CallbackMethod } from '../interfaces/response.interface';
import { coreRoutes } from '../routes/core.routes';
import { UserModel } from '../models/mongo/user.model';

export const usersController = {
	post: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		//* Encriptamos la contraseña
		const { password } = req.body;
		const salt = bcrypt.genSaltSync();
		req.body.password = bcrypt.hashSync(password, salt);
		next();
		// const callback = async () => {
		// };

		//* Se llama a los metodos base de core para realizar el post
		// (coreRoutes.routes['post'].callback as CallbackMethod)(
		// 	req,
		// 	res,
		// 	callback
		// );
	},
	put: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		const userDB = await UserModel.findById(req.params['id']);
		if (!userDB) throw 'There are not user with that id';
		if (userDB.email === req.body.email) delete req.body.email;
		delete req.body.password;
		delete req.body.google;
		next();
		// const callback = async () => {
		// const userDB = await getModelSection(req).findById(req.params['id']);
		// };
		// (coreRoutes.routes['put'].callback as CallbackMethod)(req, res, callback);
	},
};
