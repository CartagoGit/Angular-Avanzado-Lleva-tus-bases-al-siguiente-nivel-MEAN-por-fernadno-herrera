import { User } from '../models/mongo-models/user.model';
import { Hospital } from '../models/mongo-models/hospital.model';
import { Doctor } from '../models/mongo-models/doctor.model';

/**
 * * Comprueba si un objeto es de tipo usuario
 */
export const isUser = (user: any): user is User => {
	return (user as User).typeModel === 'User';
};

/**
 * * Comprueba si un objeto es de tipo hospital
 */
export const isHospital = (hospital: any): hospital is Hospital => {
	return (hospital as Hospital).typeModel === 'Hospital';
};
/**
 * * Comprueba si un objeto es de tipo Doctor
 */
export const isDoctor = (doctor: any): doctor is Doctor => {
	return (doctor as Doctor).typeModel === 'Doctor';
};

//
