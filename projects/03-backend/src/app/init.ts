import express from 'express';
import { environment } from '../environments/config';

export const config =
	environment[!!process.env['PORT'] ? 'production' : 'development'];

export const initExpress = () => {
	const port = Number(config.PORT);
	const initLog = `[ready in ${config.MODE}] ${config.URL}`;

	const app = express();

	app.get('/', (_req, res) => {
		res.json({
			message: 'Home Api Backend',
			ok: true,
			mode: config.MODE,
			log: initLog,
		});
	});

	app.listen(port, () => {
		console.log(initLog);
	});
};
