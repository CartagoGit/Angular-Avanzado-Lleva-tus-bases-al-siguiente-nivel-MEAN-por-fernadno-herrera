import expressFileupload from 'express-fileupload';

/**
 * ? Middlewares especificos para el modelo de archivos
 * @type {{ basic: any[]}}
 */
export const filesMiddlewares: { basic: any[] } = {
	basic: [expressFileupload()],
};
