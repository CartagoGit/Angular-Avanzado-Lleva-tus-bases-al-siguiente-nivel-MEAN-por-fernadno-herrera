import express from 'express';
import { config } from '../environments/config';
import { isMongoConnected } from './db/init-mongo';
import { log } from './helpers/logs';

export const initExpress = () => {
	const port = Number(config.PORT);
	const initLog = `Ready in ${config.MODE}, access into ${config.API_URL}`;

	const app = express();

	app.get('/', (_req, res) => {
		res.json({
			message: 'Home Api Backend',
			ok: true,
			mode: config.MODE,
			log: initLog,
			mongo_state: isMongoConnected ? 'Connected' : 'Disconnected',
		});
	});

	app.listen(port, () => {
		log(initLog, 'EXPRESS');
	});
};
