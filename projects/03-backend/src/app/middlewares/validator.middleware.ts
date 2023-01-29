import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { defaultErrorResponse } from '../helpers/default-responses';
import { ErrorData } from '../models/error-data.model';

export const validatorCheck = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const status_code = 406;
		const errorsArrayFormated = errors.array().map((error) => {
			return new ErrorData({
				status_code,
				message: error.msg,
				keyValue: { [error.param]: error.value },
				reason: 'validation',
			});
		});

		let finalError = {
			status_code,
			reason:
				errorsArrayFormated.length > 1 ? ([] as string[]) : 'validation',
			message:
				errorsArrayFormated.length > 1
					? 'There are a lot of validation errors. Check them to fix the problems.'
					: errorsArrayFormated[0].message,
			keyValue: {},
		};

		errorsArrayFormated.forEach((errorData) => {
			const [key, value] = Object.entries(errorData.keyValue)[0];
			finalError.keyValue = {
				...finalError.keyValue,
				[key]: value || 'NOT DEFINED',
			};
			if (Array.isArray(finalError.reason))
				finalError.reason.push(errorData.message);
		});
		const finalErrorData = new ErrorData(finalError);

		defaultErrorResponse(res, req, finalErrorData, 'MONGO', status_code);
		return;
	}
	next();
};
