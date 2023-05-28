import { Request } from 'express';
import { ResponseReturnData } from '../interfaces/response.interface';
import { getErrorNotParam } from '../helpers/default-responses.helper';
import { ApiModels } from '../models/mongo.models';
import { getQueryIncludeAndPaginate } from '../helpers/query.helpers';
import { DoctorModel } from '../models/mongo-models/doctors.model';
import { UserModel, UserSchema } from '../models/mongo-models/user.model';

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
		let field = req.params['field'];

		const { wantInclude, optionsFromQuery } = getQueryIncludeAndPaginate(req);

		const nameModels: string[] = [];
		const datas = await Promise.all(
			Object.entries(ApiModels).map(async ([modelName, model]) => {
				nameModels.push(modelName);
				let resultModel;
				if (modelName === 'Doctors') {
					//* Hacemos un apaño para no liarnos mas con el curso cambiando el backend, aunque no sea lo optimo realmente, pero el proyecto es de prueba y no merece la pena perder mas tiempo modificando el backend
					const doctors = await DoctorModel.find();
					const doctorsFiltered = doctors.filter((doctor) => {
						const user = doctor.user;
						const userField = (user as any)[field];
						return userField.includes(searching);
					});

					resultModel = {
						pagination: undefined,
						data: doctorsFiltered,
					};
				} else {
					resultModel = await (model as any).paginate(
						{
							[field]: wantInclude
								? { $regex: searching, $options: 'i' }
								: searching,
						},
						optionsFromQuery
					);
				}

				return resultModel;
			})
		);
		let objData = {};
		for (const [key, modelName] of Object.entries(nameModels)) {
			objData = { ...objData, [modelName]: datas[Number(key)] };
		}
		return { status_code: 200, data: objData, searching };
	},
};
