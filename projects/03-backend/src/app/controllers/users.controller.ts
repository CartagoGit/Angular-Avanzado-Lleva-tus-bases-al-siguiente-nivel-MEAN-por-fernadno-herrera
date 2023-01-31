import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { CallbackMethod } from '../interfaces/response.interface';
import { coreRoutes } from '../routes/core.routes';
import { getModelSection } from '../helpers/get-model-section.helper';

export const usersController = {
	post: (req: Request, res: Response) => {
		const callback = () => {
			//* Encriptamos la contraseña
			const { password } = req.body;
			const salt = bcrypt.genSaltSync();
			req.body.password = bcrypt.hashSync(password, salt);
		};

		//* Se llama a los metodos base de core para realizar el post
		(coreRoutes.routes['post'].callback as CallbackMethod)(
			req,
			res,
			callback
		);
	},
	put: (req: Request, res: Response) => {
		const callback = async () => {
			const userDB = await getModelSection(req).findById(req.params['id']);
			console.log(1);

			// TODO - el metodo se encuentra fuera del subscribe, y los errores no se controlan
			// if (!userDB) req.body.error_message = 'There are not users with that id';
			delete req.body.password;
			delete req.body.google;
			delete req.body.name;
		};
		(coreRoutes.routes['put'].callback as CallbackMethod)(req, res, callback);
	},
};
