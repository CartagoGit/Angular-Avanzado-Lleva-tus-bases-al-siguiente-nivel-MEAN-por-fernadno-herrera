import { RequestHandler } from 'express';
import expressFileupload from 'express-fileupload';

/**
 * ? Middlewares especificos para las rutas de archivos
 * @type {{ basic: RequestHandler[]}}
 */
export const filesMiddlewares: { basic: RequestHandler[] } = {
	basic: [expressFileupload()],
};
