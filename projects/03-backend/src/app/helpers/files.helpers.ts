import { Request } from 'express';
import { FileArray } from 'express-fileupload';
import { Model } from 'mongoose';
import { basicError } from '../models/error-data.model';
import {
	checkExistsAndGetModel,
	checkValidIdMongo,
	getErrorNotParam,
} from './default-responses.helper';

//* Tipos de archivos
export const typesFile = ['image', 'text', 'pdf', 'video', 'audio', 'icon'];
//* Tipado de los posibles archivos
export type TypesFile = (typeof typesFile)[number];

/**
 * ? Comprueba si un tipo de ruta es de archivo
 * @param {TypesFile} typeFile
 * @returns {typeFile is TypesFile}
 */
export const isValidTypeFile = (typeFile: TypesFile): typeFile is TypesFile =>
	typesFile
		.map((typeFileSingular) => typeFileSingular + 's')
		.includes(typeFile);

/**
 * ? Comprueba si el nombre de modelo, el tipo de archivo, y el id provenientes de la request, son validos. En caso positivo devuelve el modelo, el id y el tipo de archivo. En caso contrario throwea el error correspondiente
 * @param {Request} req
 * @returns {{ model: Model<any>; typeFile: string; id: string }}
 */
export const checkValidParamsForFilesAndGetModel = (
	req: Request
): { model: Model<any>; typeFile: string; id: string } => {
	checkParamsForFiles(req);
	const { typeFile, nameModel, id } = req.params;
	checkValidTypeFile(typeFile);
	checkValidIdMongo(id);
	const model = checkExistsAndGetModel(nameModel);
	return { model, id, typeFile };
};

/**
 * ? Comprueba que los 3 parametros para manipular archivos se encuentran en la ruta, en caso contrario devuelve un error
 * @param {Request} req
 */
export const checkParamsForFiles = (req: Request) => {
	if (!req.params['typeFile']) throw getErrorNotParam('typeFile');
	if (!req.params['nameModel']) throw getErrorNotParam('nameModel');
	if (!req.params['id']) throw getErrorNotParam('id');
};

/**
 * ? Comprueba si el tipo es un tipo de archivo permitido en caso contrario throwea un error
 * @param {string} typeFile
 * @returns {boolean}
 */
export const checkValidTypeFile = (typeFile: string): boolean => {
	if (!isValidTypeFile(typeFile))
		throw {
			message: `Param '${typeFile}' is not a valid type file. It must be ${new Intl.ListFormat(
				'en-GB',
				{ type: 'disjunction' }
			).format(typesFile)}`,
			status_code: 400,
			reason: 'invalid type file',
		} as basicError;
	return true;
};

/**
 * ? Comprueba que existan archivos en el form-data. En caso positivo los devuelve. En negativo throwea un error
 * @param {Request} req
 * @returns {FileArray}
 */
export const checkExistAndGetFilesRequest = (req: Request): FileArray => {
	if (!req.files || Object.keys(req.files).length === 0) {
		throw {
			message: `There are not any file. Check your form-data or your request`,
			status_code: 400,
			reason: 'not found file',
		} as basicError;
	}
	return req.files!;
};
