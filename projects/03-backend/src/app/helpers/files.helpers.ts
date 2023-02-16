import { Request } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';
import { Model } from 'mongoose';
import { basicError } from '../models/error-data.model';
import { getNotFoundMessageWithIdAndModel } from './get-model-section.helper';
import {
	checkExistsAndGetModel,
	checkValidIdMongo,
	getErrorNotParam,
	getListOf,
} from './default-responses.helper';

//* Tipos de archivos
export const typesFile = ['image', 'text', 'pdf', 'video', 'audio', 'icon'];
//* Tipado de los posibles archivos
export type TypesFile = (typeof typesFile)[number];

//* Tipos de imagenes
export const typesImage = ['jpeg', 'jpg', 'bmp', 'gif', 'png'];
//* Tipado de posibles times de imagenes
export type TypesImage = (typeof typesImage)[number];

/**
 * ? Tipos de Archivos y sus extensiones posibles
 * @type {{ files: {}; images: {}; }}
 */
export const typesExtension: Record<string, string[]> = {
	files: typesFile,
	images: typesImage,
};

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
 * ? Comprueba si una extension de imagen es permitida
 * @param {TypesImage} typeImage
 * @returns {typeImage is TypesImage}
 */
export const isValidTypeImage = (
	typeImage: TypesImage
): typeImage is TypesImage => typesImage.includes(typeImage);

/**
 * ? Comprueba si el nombre de modelo, el tipo de archivo, y el id provenientes de la request, son validos. En caso positivo devuelve el modelo, el id y el tipo de archivo. En caso contrario throwea el error correspondiente
 * @param {Request} req
 * @returns {{ model: Model<any>; typeFile: string; id: string }}
 */
export const checkValidParamsForFilesAndGetModel = async (
	req: Request
): Promise<{ model: Model<any>; typeFile: string; id: string }> => {
	checkParamsForFiles(req);
	const { typeFile, nameModel, id } = req.params;
	checkValidTypeFile(typeFile);
	checkValidIdMongo(id);
	const model = checkExistsAndGetModel(nameModel);
	await checkIdFromModel(id, model);
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
			message: `Param '${typeFile}' is not a valid type file. It must be ${getListOf(
				{ list: typesFile, type: 'disjunction' }
			)}`,
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
export const checkExistAndGetFilesRequest = (req: Request): UploadedFile[] => {
	if (!req.files || Object.keys(req.files).length === 0) {
		throw {
			message: `There are not any file. Check your form-data or your request`,
			status_code: 400,
			reason: 'not found file',
		} as basicError;
	}
	return [req.files['filesArray']].flat()!;
};

/**
 * ? Comprueba si existe un elemento con un id en un modelo. Si lo encuentra lo devuelve, si no lo encuentra throwea un error
 * @async
 * @param {string} id
 * @param {Model<any>} model
 * @returns {Promise<unknown>}
 */
export const checkIdFromModel = async (
	id: string,
	model: Model<any>
): Promise<unknown> => {
	const modelDB = await model.findById(id);
	if (!modelDB) {
		throw {
			message: getNotFoundMessageWithIdAndModel(id, model.modelName!),
			reason: 'not found id in model',
			status_code: 404,
		} as basicError;
	}
	return modelDB;
};

/**
 * ? Pasando un array de archivos, recupera un array con sus extensiones
 * @param {UploadedFile[]} files
 * @returns {string[]}
 */
export const getExtensionsArray = (files: UploadedFile[]): string[] =>
	files.map((file) => file.name.split('.').pop()!);

/**
 * ? Comprueba si todas las extensiones de los archivos son válidas. Si son correctas devuelve true, sino trhowea un error
 * @param {UploadedFile[]} files
 * @param {TypesFile} typeFile
 * @returns {boolean}
 */
export const checkValidExtensions = (
	files: UploadedFile[],
	typeFile: TypesFile
): boolean => {
	const extensionsArray = getExtensionsArray(files);
	const isOk = extensionsArray.every((extension) =>
		typesExtension[typeFile].includes(extension)
	);
	console.log(extensionsArray, typesExtension[typeFile]);
	if (!isOk) {
		throw {
			message: `Every file extension must be ${typeFile} format, as ${getListOf(
				{ list: typesExtension[typeFile], type: 'disjunction' }
			)}`,
			status_code: 400,
			reason: 'bad format extension',
		} as basicError;
	}
	return isOk;
};
