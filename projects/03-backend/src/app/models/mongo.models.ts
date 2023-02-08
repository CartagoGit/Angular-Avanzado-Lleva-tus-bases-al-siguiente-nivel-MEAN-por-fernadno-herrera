import { Model } from 'mongoose';
import { UserModel } from './mongo-models/user.model';
import { HospitalModel } from './mongo-models/hospital.model';
import { DoctorModel } from './mongo-models/doctors.model';

/**
 * ? Objeto con la recopilacion de modelos de la api
 * @type {Record<string, Model<any>>}
 */
export const ApiModels: Record<string, Model<any>> = {
	Users: UserModel,
	Hospitals: HospitalModel,
	Doctors: DoctorModel
};
