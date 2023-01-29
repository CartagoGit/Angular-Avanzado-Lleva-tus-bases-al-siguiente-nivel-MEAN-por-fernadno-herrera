import { Response } from 'express';
import { config } from '../../environments/config';
import { mongoState } from '../db/init-mongo';
import { getCapitalize } from './get-capitalize.helper';
import { DefaultResponseProps } from '../interfaces/response.interface';

export const rootResponse = (title: string, res: Response) => {
	const message = `${getCapitalize(title)} collection root path`;
	return res.json({
		message,
		ok: true,
		mode: config.MODE,
		status_code: 200,
		db_state: mongoState.getState(),
	} as DefaultResponseProps);
};
