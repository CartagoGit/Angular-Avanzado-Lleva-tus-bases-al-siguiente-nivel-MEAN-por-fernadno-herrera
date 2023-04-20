import { Request } from 'express';
import { QueryOptions } from 'mongoose';
import { PaginationParameters } from 'mongoose-paginate-v2';
import {
	DoctorModel,
	DoctorSchema,
} from '../models/mongo-models/doctors.model';
import { UserModel } from '../models/mongo-models/user.model';

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
		const nameRegexp = new RegExp(name as string, 'i');

		const users = await UserModel.find({ name: { $regex: nameRegexp } });
		const userIds = users.map((user) => user._id);

		const optionsFromQuery: QueryOptions<typeof DoctorModel.schema.obj> = req
			.query['options'] as object;

		const optionsPaginate = new PaginationParameters({
			query: optionsFromQuery,
		}).get()[1];

		const { data, pagination } = await (DoctorModel as any).paginate(
			{ user: { $in: userIds } },
			{
				...optionsFromQuery,
				populate: { path: 'user' },
			}
		);

		return {
			data: data,
			status_code: 200,
			pagination,
			options_paginate: optionsPaginate,
		};
	},
};
