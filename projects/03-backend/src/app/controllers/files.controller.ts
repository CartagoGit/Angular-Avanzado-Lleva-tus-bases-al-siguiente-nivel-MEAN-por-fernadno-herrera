import { Request } from 'express';
import {
	checkValidParamsForFilesAndGetModel,
	checkExistAndGetFilesRequest,
	checkValidExtensions,
} from '../helpers/files.helpers';
import { ResponseReturnData } from '../interfaces/response.interface';
import { getExtensionsArray } from '../helpers/files.helpers';

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
		const { id, model, typeFile } = await checkValidParamsForFilesAndGetModel(
			req
		);
		const files = checkExistAndGetFilesRequest(req);
		checkValidExtensions(files, typeFile);

		return { status_code: 200, data: 'archivitos' };
	},
};
