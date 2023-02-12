import { Request } from 'express';
import { validationResult } from 'express-validator';
import { ErrorData, basicError } from '../models/error-data.model';
import { UserModel } from '../models/mongo-models/user.model';
import { getErrorNotAdmin } from './default-responses.helper';

/**
 * ? Elimina el campo del chekeo de validacion de errores haciendo que pase la validación
 * @param {Request} req
 * @param {string} field
 */
export const cleanValidatorField = (req: Request, field: string) => {
	if (!(req as any)['express-validator#contexts']) return;
	(req as any)['express-validator#contexts'] = (
		(req as any)['express-validator#contexts'] as any[]
	).filter((value) => value.fields[0] !== field);
};

/**
 * ? Chequea las validaciones y si hay alguna validacion sin pasar, crea un error con las validaciones correspondientes
 * @param {Request} req
 * @returns {(ErrorData | undefined)}
 */
export const checkValidatorFields = (req: Request): ErrorData | undefined => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const status_code = 406;
		const errorData = new ErrorData({
			status_code,
			reason: 'validation',
			message: `There are ${
				errors.array().length
			} validation errors. Check them to fix the problems.`,
			keyValue: errors.mapped(),
		});
		return errorData;
	}
	return;
};

/**
 * ? Comprueba si el usuario es Administrador
 * @async
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export const validateAdmin = async (
	id: string
): Promise<{ ok: boolean; id: string }> => {
	const userDB = await UserModel.findById(id);
	if (!userDB || !userDB.role) throw getErrorNotAdmin();
	return { ok: userDB.role === 'ADMIN_ROLE', id };
};

/**
 * ? Valida si el usuario intenta acceder a datos que no son suyos sin ser administrador
 * @async
 * @param {Request} req
 * @param {string} id
 * @returns {Promise<{ ok: boolean; id: string }>}
 */
export const validateSameUser = async (
	req: Request,
	id: string
): Promise<{ ok: boolean; id: string }> => {
	const { ok: isAdmin } = await validateAdmin(id);
	if ((!req.params['id'] || req.params['id'] !== id) && !isAdmin)
		throw {
			message: 'User just can interactuate with his own data',
			status_code: 401,
			reason: 'not same user',
		} as basicError;
	return { ok: true, id };
};
