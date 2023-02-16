import { Request } from 'express';
import {
	checkValidParamsForFilesAndGetModel,
	checkExistAndGetFilesRequest,
	checkAndGetExtensions,
} from '../helpers/files.helpers';
import { ResponseReturnData } from '../interfaces/response.interface';
import { getFilesNames } from '../helpers/files.helpers';

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
		const extensionsArray = checkAndGetExtensions(files, typeFile);
		const filesNames = getFilesNames(extensionsArray, {
			id,
			typeFile,
			nameModel: model.modelName,
		});
		console.log(filesNames);

		return { status_code: 200, data: 'archivitos' };
	},
};
