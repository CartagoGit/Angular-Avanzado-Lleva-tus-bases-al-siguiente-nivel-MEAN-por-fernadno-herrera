import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { CallbackMethod } from '../interfaces/response.interface';
import { coreRoutes } from '../routes/core.routes';

export const usersController = {
	post: (req: Request, res: Response) => {
		//* Encriptamos la contraseña
		const { password } = req.body;
		const salt = bcrypt.genSaltSync();
		req.body.password = bcrypt.hashSync(password, salt);

		//* Se llama a los metodos base de core para realizar el post
		(coreRoutes.routes['post'].callback as CallbackMethod)(req, res);
	},
};
