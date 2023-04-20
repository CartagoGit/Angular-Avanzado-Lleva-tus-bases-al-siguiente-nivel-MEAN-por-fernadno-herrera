import { Request } from 'express';
import { DoctorModel } from '../models/mongo-models/doctors.model';

/**
 * ? Controladores especificos de los metodos para el modelo de usuarios
 * @type {{
	getDoctors: (req: Request) => Promise<any>;
	getPatients: (req: Request) => Promise<any>;
}}
 */
export const doctorsController: {
	getDoctorsByName: (req: Request) => Promise<any>;
} = {
	//* Especificos de esta BD de usuarios
	getDoctorsByName: async (req) => {
		const { name } = req.query;
		console.log('❗getDoctorsByName:  ➽ name ➽ ⏩', name);
		const nameRegexp = new RegExp(name as string, 'i');
		console.log('❗getDoctorsByName:  ➽ nameRegexp ➽ ⏩', nameRegexp);
		// const doctorsBD = await DoctorModel.find({ 'user.name': nameRegexp });
		const doctorsBD = await DoctorModel.find({
			'user.name': 'NombreHardcodeado',
		});
		const doctorsprueba = await DoctorModel.find({});
		const { data, pagination } = await (DoctorModel as any).paginate(
			// { user: { name: nameRegexp } },
			{'user.email': '63fd098264cb17db71945622'},
			{}
		);
		// console.log('❗getDoctorsByName:  ➽ pagination ➽ ⏩', pagination);
		console.log('❗getDoctorsByName:  ➽ data ➽ ⏩', data);
		// console.log('❗getDoctorsByName:  ➽ doctorsprueba ➽ ⏩', doctorsprueba);
		console.log('❗getDoctorsByName:  ➽ doctorsBD ➽ ⏩', doctorsBD);
		return { data: doctorsBD, status_code: 200 };
	},
};
