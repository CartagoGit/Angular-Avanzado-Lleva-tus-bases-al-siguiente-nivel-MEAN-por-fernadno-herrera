import { Request } from 'express';
import {
	checkAndGetFilesArgs,
	checkAndCreateFolder,
} from '../helpers/files.helpers';
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
		const { files, filesPath, typeFile, model } = await checkAndGetFilesArgs(
			req
		);
		checkAndCreateFolder({ nameModel: model.modelName, typeFile });
		files.forEach(async (file, index) => await file.mv(filesPath[index]));

		return { status_code: 200, data: 'archivitos' };
	},
};
