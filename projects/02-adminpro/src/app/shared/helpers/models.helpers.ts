import { User } from '../models/mongo-models/user.model';
import { Hospital } from '../models/mongo-models/hospital.model';
import { Doctor } from '../models/mongo-models/doctor.model';
import { ModelClassMongo, ModelsMongo } from '../interfaces/models.interface';

/**
 * * Comprueba si un objeto es de tipo usuario
 */
export const isUser = (user: any): user is User => {
	return (user as User)?.classModel === 'User';
};

/**
 * * Comprueba si un objeto es de tipo hospital
 */
export const isHospital = (hospital: any): hospital is Hospital => {
	return (hospital as Hospital)?.classModel === 'Hospital';
};
/**
 * * Comprueba si un objeto es de tipo Doctor
 */
export const isDoctor = (doctor: any): doctor is Doctor => {
	return (doctor as Doctor)?.classModel === 'Doctor';
};

/**
 * ? Obtiene el tipo de modelo segun su clase
 * @param {ModelClassMongo} classModel
 * @returns {ModelsMongo}
 */
export const getTypeModel = (classModel: ModelClassMongo): ModelsMongo => {
	const typeModels: Record<ModelClassMongo, ModelsMongo> = {
		User: 'users',
		Hospital: 'hospitals',
		Doctor: 'doctors',
	};

	return typeModels[classModel];
};

/**
 * ? Obtiene la clase del modelo segun su tipo
 * @param {ModelsMongo} typeModel
 * @returns {ModelClassMongo}
 */
export const getClassModel = (typeModel: ModelsMongo): ModelClassMongo => {
	const classModels: Record<ModelsMongo, ModelClassMongo> = {
		users: 'User',
		hospitals: 'Hospital',
		doctors: 'Doctor',
	};
	return classModels[typeModel];
};

//
