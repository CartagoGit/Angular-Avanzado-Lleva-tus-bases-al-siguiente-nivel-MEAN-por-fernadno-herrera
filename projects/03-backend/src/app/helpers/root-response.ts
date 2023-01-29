import { Response } from 'express';
import { config } from '../../environments/config';
import { mongoState } from '../db/init-mongo';

export const rootResponse = (title: string, res: Response) => {
	const message = `${
		title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
	} collection root path`;

	return res.json({
		message,
		ok: true,
		mode: config.MODE,
		db_state: mongoState.getState(),
	});
};
