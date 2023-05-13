import { initExpress } from "./app/db/init-express";
import { initMongo } from "./app/db/init-mongo";


/**
 * ? Inicia la conexion a la base de datos y crea el servidor
 */
initMongo();
initExpress();
