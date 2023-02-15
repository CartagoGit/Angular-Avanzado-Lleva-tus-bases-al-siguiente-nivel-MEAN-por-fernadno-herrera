import { Request } from 'express';
import { getErrorNotParam } from '../helpers/default-responses.helper';
import { ResponseReturnData } from '../interfaces/response.interface';

/**
 * ? Controladores especificos para manipulacion de archivos
 * @type {{
	upload: (
		req: Request
	) => Promise<
		ResponseReturnData
	>;
}}
 */
export const filesController: {
	upload: (req: Request) => Promise<ResponseReturnData>;
} = {
	upload: async (req: Request) => {
		if (!req.params['typeFile']) throw getErrorNotParam('typeFile');
		if (!req.params['model']) throw getErrorNotParam('model');
		if (!req.params['id']) throw getErrorNotParam('id');
		const { typeFile, model, id } = req.params;
		console.log(typeFile, model, id);

		return { status_code: 200, data: 'archivitos' };
	},
};
