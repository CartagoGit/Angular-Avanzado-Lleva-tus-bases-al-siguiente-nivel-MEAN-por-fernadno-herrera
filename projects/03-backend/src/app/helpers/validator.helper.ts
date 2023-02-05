import { Request } from 'express';


/**
 * ? Elimina el campo del chekeo de validacion de errores haciendo que pase la validación
 * @param {Request} req
 * @param {string} field
 */
export const cleanValidatorField = (req: Request, field: string) => {
	(req as any)['express-validator#contexts'] = (
		(req as any)['express-validator#contexts'] as any[]
	).filter((value) => value.fields[0] !== field);
};
