import { User } from '../models/mongo-models/user.model';
import { Hospital } from '../models/mongo-models/hospital.model';
import { Doctor } from '../models/mongo-models/doctor.model';
import {
	ModelClassMongo,
	Models,
	ModelsMongo,
} from '../interfaces/models.interface';

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
 * * Comprueba si un objeto es de algun tipo de modelo
 */
export const isModel = (model: any): model is Models => {
	return isUser(model) || isHospital(model) || isDoctor(model);
};

/**
 * ? Obtiene el tipo de modelo segun su clase
 * @param {ModelClassMongo} classModel
 * @returns {ModelsMongo}
 */
export const getTypeModel = (classNameModel: ModelClassMongo): ModelsMongo => {
	const typeModels: Record<ModelClassMongo, ModelsMongo> = {
		User: 'users',
		Hospital: 'hospitals',
		Doctor: 'doctors',
	};

	return typeModels[classNameModel];
};

/**
 * ? Obtiene la clase del modelo segun su tipo
 * @param {ModelsMongo} typeModel
 * @returns {ModelClassMongo}
 */
export const getClassNameModel = (typeModel: ModelsMongo): ModelClassMongo => {
	const classNameModels: Record<ModelsMongo, ModelClassMongo> = {
		users: 'User',
		hospitals: 'Hospital',
		doctors: 'Doctor',
	};
	return classNameModels[typeModel];
};

/**
 * ? Obtiene el modelo segun su tipo o su clase
 * @param {{
	typeModel?: ModelsMongo;
	className?: ModelClassMongo;
}} data
 * @returns {(Models | null)}
 */
export const getModel = (data: {
	typeModel?: ModelsMongo;
	className?: ModelClassMongo;
}): Models | null => {
	const { typeModel, className } = data;
	if (!typeModel && !className) return null;
	let classNameModel: ModelClassMongo =
		className || getClassNameModel(typeModel!);
	const model = {
		User,
		Hospital,
		Doctor,
	}[classNameModel];
	return model;
};

//
