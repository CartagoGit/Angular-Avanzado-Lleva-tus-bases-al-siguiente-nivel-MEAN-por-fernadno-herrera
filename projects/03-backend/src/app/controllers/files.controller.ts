import { Request } from 'express';
import {
	checkAndGetFilesArgs,
	checkAndCreateFolder,
} from '../helpers/files.helpers';
import { ResponseReturnData } from '../interfaces/response.interface';
import {
	throwErrorUploadFiles,
	getFilesNames,
	throwErrorDeleteFiles,
} from '../helpers/files.helpers';
import fs from 'fs';

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
		//* Si se recibe el valor replace, elimina los archivos que existieran en el anterior path del modelo, sino simplemente añade nuevos
		const isReplace = !!req.query['replace'];
		const { files, filesPath, typeFile, model, filesName, id, document } =
			await checkAndGetFilesArgs(req);
		checkAndCreateFolder({ nameModel: model.modelName, typeFile });
		files.forEach((file, index) =>
			file.mv(filesPath[index], throwErrorUploadFiles)
		);
		if (!!isReplace) {
			(document.get(typeFile) as string[]).forEach((path) => {
				if (!!fs.existsSync(path)) fs.unlink(path, throwErrorDeleteFiles);
			});
		}
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
};
