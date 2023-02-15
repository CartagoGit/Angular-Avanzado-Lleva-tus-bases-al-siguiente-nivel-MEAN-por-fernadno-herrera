import { Request } from 'express';
import { checkValidParamsForFilesAndGetModel } from '../helpers/default-responses.helper';
import { ResponseReturnData } from '../interfaces/response.interface';

/**
 * ? Controladores especificos para manipulacion de archivos
 * @type {{
	upload: (req: Request) => Promise<ResponseReturnData>;
}}
 */
export const filesController: {
	upload: (req: Request) => Promise<ResponseReturnData>;
} = {
	upload: async (req: Request) => {
		const { id, model, typeFile } = checkValidParamsForFilesAndGetModel(req);

		return { status_code: 200, data: 'archivitos' };
	},
};
