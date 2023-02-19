import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Model } from 'mongoose';
import { basicError } from '../models/error-data.model';
import { getNotFoundMessageWithIdAndModel } from './get-model-section.helper';
import {
	checkExistsAndGetModel,
	checkValidIdMongo,
	getErrorNotParam,
	getListOf,
} from './default-responses.helper';
import { v4 as uuidv4 } from 'uuid';
import { FilesData } from '../interfaces/files.interfaces';
import { config } from '../../environments/config';
import fs from 'fs';

//* Tipos de archivos
export const typesFile = [
	'image',
	'text',
	'pdf',
	'video',
	'audio',
	'icon',
] as const;
//* Tipado de los posibles archivos
export type TypesFile = (typeof typesFile)[number];

//* Tipos de imagenes
export const typesImage = ['jpeg', 'jpg', 'bmp', 'gif', 'png'] as const;
//* Tipado de posibles times de imagenes
// export type TypesImage = (typeof typesImage)[number];
export type TypesImage = (typeof typesImage)[number];

//* Tipado de las posibles extensiones combinadas
export type TypesExtensionsCombined = TypesImage;

//* Tipado de posibles typos de... combinados
export type TypesOfExtensionsCombined = typeof typesImage;

/**
 * ? Tipos de Archivos y sus extensiones posibles
 * @type {Record<string, string[]>}
 */
export const typesExtension: Readonly<
	Record<string, typeof typesFile | TypesOfExtensionsCombined>
> = {
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
 * ? Comprueba
 * @async
 * @param {Request} req
 * @returns {unknown}
 */
export const checkAndGetFilesArgs = async (
	req: Request
): Promise<FilesData> => {
	const { id, model, typeFile } = await checkValidParamsForFilesAndGetModel(
		req
	);
	const files = checkExistAndGetFilesRequest(req);
	const extensionsArray = checkAndGetExtensions(files, typeFile);
	const filesName = getFilesNames(extensionsArray, {
		id,
		typeFile,
		nameModel: model.modelName,
	});
	const filesPath = getFilesPath({
		typeFile,
		filesName,
		nameModel: model.modelName,
	});

	return { id, model, typeFile, files, extensionsArray, filesName, filesPath };
};

/**
 * ? Comprueba si el nombre de modelo, el tipo de archivo, y el id provenientes de la request, son validos. En caso positivo devuelve el modelo, el id y el tipo de archivo. En caso contrario throwea el error correspondiente
 * @param {Request} req
 * @returns {{ model: Model<any>; typeFile: string; id: string }}
 */
export const checkValidParamsForFilesAndGetModel = async (
	req: Request
): Promise<{ model: Model<any>; typeFile: TypesFile; id: string }> => {
	checkParamsForFiles(req);
	const { typeFile, nameModel, id } = req.params;
	checkValidTypeFile(typeFile as TypesFile);
	checkValidIdMongo(id);
	const model = checkExistsAndGetModel(nameModel);
	await checkIdFromModel(id, model);
	return { model, id, typeFile: typeFile as TypesFile };
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
export const checkValidTypeFile = (typeFile: TypesFile): boolean => {
	if (!isValidTypeFile(typeFile))
		throw {
			message: `Param '${typeFile}' is not a valid type file. It must be ${getListOf(
				{
					list: typesFile.map((fileType) => fileType.toString()),
					type: 'disjunction',
				}
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
 * @returns {TypesExtensionsCombined[]}
 */
export const getExtensionsArray = (
	files: UploadedFile[]
): TypesExtensionsCombined[] =>
	files.map((file) => file.name.split('.').pop()! as TypesExtensionsCombined);

/**
 * ? Comprueba si todas las extensiones de los archivos son válidas. Si son correctas devuelve true, sino trhowea un error
 * @param {UploadedFile[]} files
 * @param {TypesFile} typeFile
 * @returns {TypesExtensionsCombined[]}
 */
export const checkAndGetExtensions = (
	files: UploadedFile[],
	typeFile: TypesFile
): TypesExtensionsCombined[] => {
	const extensionsArray = getExtensionsArray(files);
	const isOk = extensionsArray.every((extension) =>
		(typesExtension[typeFile] as TypesOfExtensionsCombined).includes(
			extension
		)
	);
	if (!isOk) {
		throw {
			message: `Every file extension must be ${typeFile} format, as ${getListOf(
				{
					list: typesExtension[typeFile].map((extension) =>
						extension.toString()
					),
					type: 'disjunction',
				}
			)}`,
			status_code: 400,
			reason: 'bad format extension',
		} as basicError;
	}
	return extensionsArray;
};

/**
 * ? Genera y recupera un nombre para cada archivo del array añadiendole su extension
 * * Si se pasa el id, el tipo y el nombre del modelo se añaden en el nombre del archivo seguido de un id aleatorio, en caso contrario se añade un id aleatorio como nombre
 * @param {string[]} extensionsArray
 * @param {?{ id: string; typeFile: string; nameModel: string }} [data]
 * @returns {string[]}
 */
export const getFilesNames = (
	extensionsArray: string[],
	data?: { id: string; typeFile: string; nameModel: string }
): string[] => {
	const { id, typeFile, nameModel } = data || {};
	return extensionsArray.map(
		(extension) =>
			`${
				data
					? nameModel?.toLowerCase() +
					  '_' +
					  typeFile +
					  '_' +
					  id +
					  '_' +
					  uuidv4()
					: uuidv4()
			}.${extension}`
	);
};

/**
 * ? Recupera el path de un array de archivos, y retorna un array con la lista de paths
 * @param {({
	filesName: string | string[];
	typeFile: string;
	nameModel: string;
})} data
 * @returns {string[]}
 */
export const getFilesPath = (data: {
	filesName: string | string[];
	typeFile: string;
	nameModel: string;
}): string[] => {
	const { filesName, nameModel, typeFile } = data;
	if (Array.isArray(filesName)) {
		return filesName.map((nameFile) =>
			getFilePath({ nameFile, nameModel, typeFile })
		);
	} else return [getFilePath({ nameFile: filesName, nameModel, typeFile })];
};

/**
 * ? Recupera el path de un archivo
 * @param {({nameFile : string | string [], typeFile : string, nameModel: string})} data
 * @returns {string}
 */
export const getFilePath = (data: {
	nameFile: string | string[];
	typeFile: string;
	nameModel: string;
}): string => {
	const { nameFile, nameModel, typeFile } = data;
	const path = `${__dirname}/${config.UPLOAD_FOLDER}/${nameModel}/${typeFile}/${nameFile}`;
	console.log(path);
	return path;
};

/**
 * ? Comprueba que existan las rutas para subir los archivos, y en caso de no existir, crea las carpetas necesarias
 * @param {{
	nameModel: string;
	typeFile: string;
}} data
 */
export const checkAndCreateFolder = (data: {
	nameModel: string;
	typeFile: string;
}) => {
	const { nameModel, typeFile } = data;
	const uploadFolder = `${__dirname}/${config.UPLOAD_FOLDER}`;
	const modelFolder = `${uploadFolder}/${nameModel}`;
	const typeFileFolder = `${modelFolder}/${typeFile}`;
	console.log(uploadFolder);
	if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);
	if (!fs.existsSync(modelFolder)) fs.mkdirSync(modelFolder);
	if (!fs.existsSync(typeFileFolder)) fs.mkdirSync(typeFileFolder);
};

/**
 * ? Throwea un error en caso de que ocurra algun problema al subir archivos al servidor
 * @returns {never}
 */
export const throwErrorUploadFiles = (error: any): void => {
	if (!!error) {
		throw {
			error_data: error,
			message: 'Cannot upload files. Contact with your server administrator',
			reason: 'cannot upload files',
			status_code: 500,
		} as basicError;
	}
};
