import { initMongo } from './app/db/init-mongo';
import { initExpress } from './app/db/init-express';

/**
 * ? Inicia la conexion a la base de datos y crea el servidor
 */
initMongo();
initExpress();
