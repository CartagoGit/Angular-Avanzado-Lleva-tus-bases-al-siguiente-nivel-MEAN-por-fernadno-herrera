import { Request } from 'express';
import { ResponseReturnData } from '../interfaces/response.interface';
import { getErrorNotParam } from '../helpers/default-responses.helper';
import { ApiModels } from '../models/mongo.models';

/**
 * ? Controladores especificos para las busquedas en todos los modelos
 * @type {{
	getFromEverywhere: (req: Request) => Promise<ResponseReturnData>;
}}
 */
export const everywhereController: {
	getFromEverywhere: (req: Request) => Promise<ResponseReturnData>;
} = {
	getFromEverywhere: async (req) => {
		if (!req.params['search']) throw getErrorNotParam('search');
		// const searching = RegExp(req.params['search'], 'i');
		const searching = req.params['search'];

		const nameModels: string[] = [];
		const datas = await Promise.all(
			Object.entries(ApiModels).map(async ([modelName, model]) => {
				// await model.collection.createIndex({ '$**': 'text' });
				// return model.find({ $text: { $search: searching, $caseSensitive: false } });
				nameModels.push(modelName);
				return model.find({
					$or: [
						{
							name: {
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
