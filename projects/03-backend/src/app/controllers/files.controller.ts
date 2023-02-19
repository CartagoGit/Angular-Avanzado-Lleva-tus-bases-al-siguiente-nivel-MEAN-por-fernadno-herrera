import { Request } from 'express';
import {
	checkValidParamsForFilesAndGetModel,
	checkExistAndGetFilesRequest,
	checkAndGetExtensions,
	getFilesPath,
	checkAndGetFilesArgs,
} from '../helpers/files.helpers';
import { ResponseReturnData } from '../interfaces/response.interface';
import { getFilesNames } from '../helpers/files.helpers';
import { UploadedFile } from 'express-fileupload';

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
		const { files, filesPath } = await checkAndGetFilesArgs(req);
		files.forEach(async (file, index) => await file.mv(filesPath[index]));

		return { status_code: 200, data: 'archivitos' };
	},
};
