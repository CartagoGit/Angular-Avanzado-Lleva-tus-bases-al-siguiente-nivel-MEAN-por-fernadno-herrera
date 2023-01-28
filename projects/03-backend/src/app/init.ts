import express from 'express';
import { environment } from '../environments/env.dev';

export const initExpress = () => {
	const port = process.env['PORT']
		? Number(process.env['PORT'])
		: environment.PORT;

	const app = express();

	app.get('/', (req, res) => {
		res.send({ message: 'Hello API' });
	});

	app.listen(port, () => {
		console.log(`[ ready ] http://localhost:${port}`);
	});
};
