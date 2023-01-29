import { Response } from 'express';
import { config } from '../../environments/config';
import { mongoState } from '../db/init-mongo';
import { getCapitalize } from './get-capitalize.helper';

export const rootResponse = (title: string, res: Response) => {
	const message = `${getCapitalize(title)} collection root path`;
	return res.json({
		message,
		ok: true,
		mode: config.MODE,
		db_state: mongoState.getState(),
	});
};
