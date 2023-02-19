import { Request } from 'express';
import {
	checkAndGetFilesArgs,
	checkAndCreateFolder,
} from '../helpers/files.helpers';
import { ResponseReturnData } from '../interfaces/response.interface';
import { throwErrorUploadFiles, getFilesNames } from '../helpers/files.helpers';

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
		const { files, filesPath, typeFile, model, filesName } =
			await checkAndGetFilesArgs(req);
		checkAndCreateFolder({ nameModel: model.modelName, typeFile });
		files.forEach((file, index) =>
			file.mv(filesPath[index], throwErrorUploadFiles)
		);

		return {
			status_code: 201,
			data: 'Files uploaded successfully',
			files,
			typeFile,
			nameModel: model.modelName,
			getFilesNames,
			filesName,
		};
	},
};
