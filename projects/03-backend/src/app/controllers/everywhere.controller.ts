import { Request } from 'express';
import { ResponseReturnData } from '../interfaces/response.interface';
import { getErrorNotParam } from '../helpers/default-responses.helper';
import { ApiModels } from '../models/mongo.models';

/**
 * ? Controladores especificos para las busquedas en todos los modelos
 * @type {{
	getFrom: (req: Request) => Promise<ResponseReturnData>;
}}
 */
export const everywhereController: {
	getFrom: (req: Request) => Promise<ResponseReturnData>;
} = {
	//* Busca cualquier modelo con name igual al parametro search incluyendolos
	getFrom: async (req) => {
		if (!req.params['search']) throw getErrorNotParam('search');
		if (!req.params['field']) throw getErrorNotParam('field');
		// const searching = RegExp(req.params['search'], 'i');
		const searching = req.params['search'];
		const field = req.params['field']

		const nameModels: string[] = [];
		const datas = await Promise.all(
			Object.entries(ApiModels).map(async ([modelName, model]) => {
				// await model.collection.createIndex({ '$**': 'text' });
				// return model.find({ $text: { $search: searching, $caseSensitive: false } });
				nameModels.push(modelName);
				return model.find({
					$or: [
						{
							[field]: {
								$regex: searching,
								$options: 'i',
							},
						},
					],
				});
			})
		);
		let objData = {};
		for (const [key, modelName] of Object.entries(nameModels)) {
			objData = { ...objData, [modelName]: datas[Number(key)] };
		}
		return { status_code: 200, data: objData, searching };
	},
};
