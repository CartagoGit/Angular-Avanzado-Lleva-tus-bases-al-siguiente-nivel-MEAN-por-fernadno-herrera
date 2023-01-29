import { initMongo } from './app/db/init-mongo';
import { initExpress } from './app/init-express';

initMongo();
initExpress();
