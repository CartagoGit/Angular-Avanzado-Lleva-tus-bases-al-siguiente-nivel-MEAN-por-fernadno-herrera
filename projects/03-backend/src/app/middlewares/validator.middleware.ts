import { Request } from 'express';
import { validationResult } from 'express-validator';
import { ErrorData } from '../models/error-data.model';

/**
 * ? Chequea las validaciones y si hay alguna validacion sin pasar, crea un error con las validaciones correspondientes
 * @param {Request} req
 * @returns {(ErrorData | undefined)}
 */
export const validatorCheck = (req: Request): ErrorData | undefined => {
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
