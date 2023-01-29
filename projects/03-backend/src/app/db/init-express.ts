import express from 'express';
import cors from 'cors';
import { config } from '../../environments/config';
import { log } from '../helpers/logs';
import { baseRoutes } from '../routes/base.routes';
import { mongoState } from './init-mongo';

export const initExpress = () => {
	const port = Number(config.PORT);
	const initLog = `Ready in ${config.MODE}, access into ${config.API_URL}`;

	const app = express();

	app.use(cors());

	app.get('/', (_req, res) => {
		res.json({
			message: 'Home Api Backend',
			ok: true,
			mode: config.MODE,
			log: initLog,
			db_state: mongoState.getState(),
		});
	});

	app.use('/api', baseRoutes.router);

	app.listen(port, () => {
		log(initLog, 'EXPRESS');
	});
};
