import { Request } from 'express';
import {
	checkAndGetFilesArgs,
	checkAndCreateFolder,
	deleteFilesFromTypeFile,
	checkValidParamsForFilesAndGetModel,
} from '../helpers/files.helpers';
import { ResponseReturnData } from '../interfaces/response.interface';
import {
	throwErrorUploadFiles,
	getFilesNames,
	checkParamFileName,
} from '../helpers/files.helpers';
import path from 'path';
import fs from 'fs';
import { basicError } from '../models/error-data.model';

/**
 * ? Controladores especificos para manipulacion de archivos
 * @type {{
	upload: (req: Request) => Promise<ResponseReturnData>;
}}
 */
export const filesController: {
	upload: (req: Request) => Promise<ResponseReturnData>;
	download: (req: Request) => Promise<ResponseReturnData>;
} = {
	upload: async (req: Request) => {
		//* Si se recibe el valor replace, elimina los archivos que existieran en el anterior path del modelo, sino simplemente añade nuevos
		const isReplace = !!req.query['replace'];
		//* Si se recibe el valor 'replace_all', elimina TODOS los archivos de ese tipo que existan de esa id
		const isReplaceEveryPath = !!req.query['replace_all'];
		const { files, filesPath, typeFile, model, filesName, id, document } =
			await checkAndGetFilesArgs(req);
		const { typeFileFolder } = checkAndCreateFolder({
			nameModel: model.modelName,
			typeFile,
		});
		//* Remplaza los archivos, o elimina todos los archivos que sean de ese id
		if (!!isReplace || !!isReplaceEveryPath) {
			deleteFilesFromTypeFile(
				!!isReplaceEveryPath
					? { typeFileFolder, id }
					: { document, typeFile },
				!!isReplaceEveryPath
			);
		}
		files.forEach((file, index) =>
			file.mv(filesPath[index], throwErrorUploadFiles)
		);
		await model.findByIdAndUpdate(id, { [typeFile]: filesPath });

		return {
			status_code: 201,
			data: 'Files uploaded successfully',
			files,
			typeFile,
			nameModel: model.modelName,
			idModel: id,
			getFilesNames,
			filesName,
		};
	},
	download: async (req: Request) => {
		const nameFile = checkParamFileName(req);
		const { model, typeFile } = await checkValidParamsForFilesAndGetModel(
			req
		);
		const pathFile = path.join(
			__dirname,
			`uploads/${model.modelName}/${typeFile}/${nameFile}`
		);
		if (!fs.existsSync(pathFile)) {
			throw {
				status_code: 404,
				message: 'File not found in DataBase',
				reason: 'file not found',
			} as basicError;
		}

		return {
			status_code: 200,
			data: pathFile,
			sendFile: true,
		};
	},
};
