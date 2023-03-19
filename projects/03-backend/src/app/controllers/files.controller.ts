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
import fs from 'fs';
import { isValidObjectId } from 'mongoose';
import { throwErrorFileNotFound } from '../helpers/files.helpers';
import { config } from '../../environments/config';

/**
 * ? Controladores especificos para manipulacion de archivos
 * @type {{
	upload: (req: Request) => Promise<ResponseReturnData>;
	download: (req: Request) => Promise<ResponseReturnData>;
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
		const { typeFileFolder, relativeFolder } = checkAndCreateFolder({
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
		const filesRoute = filesName.map(
			(name) => `${config.API_URL}/files/download${relativeFolder}/${id}/${name}`
		);
		await model.findByIdAndUpdate(id, { [typeFile]: filesRoute });

		return {
			status_code: 201,
			data: 'Files uploaded successfully',
			files,
			typeFile,
			nameModel: model.modelName,
			idModel: id,
			getFilesNames,
			filesName,
			filesPath,
			filesRoute
		};
	},
	download: async (req: Request) => {
		//* Si se recibe fileName, se busca el archivo entre los del modelo, en caso contrario se coge el primer archiuvo
		const { model, typeFile, document } =
			await checkValidParamsForFilesAndGetModel(req);
		const isFirst = isValidObjectId(req.originalUrl.split('/').slice(-1)[0]);

		const firstFile: string | undefined =
		document.get(typeFile).length > 0
		? document.get(typeFile)[0].split('/').slice(-1)[0]
		: undefined;
		if (!firstFile) throwErrorFileNotFound();
		console.log("❗download:  ➽ firstFile ➽ ⏩" , firstFile);

		const nameFile = isFirst ? firstFile : checkParamFileName(req);
		// const pathFile = path.join(
		// __dirname,
		// `uploads/${model.modelName}/${typeFile}/${nameFile}`
		// );
		let pathFile = `${config.UPLOAD_FOLDER}/${model.modelName}s/${typeFile}/${nameFile}`;
		console.log("❗download:  ➽ pathFile ➽ ⏩" , pathFile);
		if (!fs.existsSync(pathFile)) throwErrorFileNotFound();

		return {
			status_code: 200,
			data: pathFile,
			sendFile: true,
		};
	},
};
