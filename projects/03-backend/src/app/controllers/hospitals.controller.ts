import { Request } from "express";
import { DoctorModel } from "../models/mongo-models/doctors.model";

/**
 * ? Controladores especificos de los metodos para el modelo de usuarios
 * @type {{
	getDoctors: (req: Request) => Promise<any>;
	getPatients: (req: Request) => Promise<any>;
}}
 */
export const hospitalsController: {
	getDoctors: (req: Request) => Promise<any>;
	getPatients: (req: Request) => Promise<any>;
} = {

	//* Especificos de esta BD de usuarios
	getDoctors: async (req) => {
		const doctorsBD = await DoctorModel.find({ hospitals: req.params['id'] });
		return { data: doctorsBD, status_code: 200 };
	},
	getPatients: async (req) => {
		const doctorsBD = await DoctorModel.find({
			hospitals: req.params['id'],
		});
		const patientsFromHospital: any[] = [];
		for (let doctor of doctorsBD) {
			for (let patient of doctor.patients) {
				const isPatientAdded = patientsFromHospital.some(
					(patientFromHospital) => patientFromHospital.id === patient.id
				);
				if (!isPatientAdded) patientsFromHospital.push(patient);
			}
		}
		return { data: patientsFromHospital, status_code: 200 };
	},
};
