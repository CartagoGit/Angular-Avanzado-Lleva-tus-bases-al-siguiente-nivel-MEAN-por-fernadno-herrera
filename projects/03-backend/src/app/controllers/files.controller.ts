import { Request } from 'express';
import { checkParamsForFiles, checkExistsAndGetModel } from '../helpers/default-responses.helper';
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
		checkParamsForFiles(req);
		const { typeFile, nameModel, id } = req.params;

		const model = checkExistsAndGetModel(nameModel)
		console.log(model);

		return { status_code: 200, data: 'archivitos' };
	},
};
