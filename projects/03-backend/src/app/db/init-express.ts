import express from 'express';
import cors from 'cors';
import { config } from '../../environments/config';
import { log } from '../helpers/logs.helper';
import { rootRoutes } from '../routes/root.routes';
import { mongoState } from './init-mongo';

/**
 * ? Inicia el servidor de Express
 */
export const initExpress = () => {
	const port = Number(config.PORT);
	const initLog = `Ready in ${config.MODE}, access into ${config.API_URL}`;

	const app = express();

	//* Añade los cors al servidor
	app.use(cors());

	//* Añadimos una carpeta pública
	app.use(express.static(__dirname + '/public'));

	//* Permite a express trabajar con archivos json
	app.use(express.json());

	//* Mensaje inicial de la base de la api
	app.get('/', (_req, res) => {
		res.status(200).json({
			message: 'Home Api backend root',
			ok: true,
			mode: config.MODE,
			db_state: mongoState.getState(),
			log: initLog,
			status_code: 200,
		});
	});

	//* Crea las rutas para las peticiones
	app.use('/api', rootRoutes.router);

	//* Inicia el servidor en el puerto establecido
	app.listen(port, () => {
		log({ msg: initLog, logType: 'EXPRESS' });
	});
};
