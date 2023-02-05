import { Request } from 'express';

export const cleanValidatorField = (req: Request, field: string) => {
	(req as any)['express-validator#contexts'] = (
		(req as any)['express-validator#contexts'] as any[]
	).filter((value) => value.fields[0] !== field);
};
