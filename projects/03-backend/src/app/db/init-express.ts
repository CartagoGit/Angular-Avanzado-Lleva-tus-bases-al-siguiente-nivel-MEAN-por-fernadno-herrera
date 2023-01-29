import express from 'express';
import cors from 'cors';
import { config } from '../../environments/config';
import { log } from '../helpers/logs.helper';
import { rootRoutes } from '../routes/root.routes';
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

	app.use('/api', rootRoutes.router);

	app.listen(port, () => {
		log(initLog, 'EXPRESS');
	});
};
