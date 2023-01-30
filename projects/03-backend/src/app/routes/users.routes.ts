import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { usersMiddlewares } from '../middlewares/users/users.middleware';
import { Request, Response } from 'express';
import { CallbackMethod } from '../interfaces/response.interface';
import bcrypt from 'bcryptjs';

/**
 * * /api/users
 */

export const usersRoutes: Routes = new Routes({
	...coreRoutes.routes,
	post: {
		...coreRoutes.routes['post'],
		callback: (req: Request, res: Response) => {
			//* Encriptamos la contraseña
			const { password } = req.body;
			const salt = bcrypt.genSaltSync();
			req.body.password = bcrypt.hashSync(password, salt);

			//* Se llama a los metodos base de core para realizar el post
			(coreRoutes.routes['post'].callback as CallbackMethod)(req, res);
		},
		middlewares: usersMiddlewares.post,
	},
});
