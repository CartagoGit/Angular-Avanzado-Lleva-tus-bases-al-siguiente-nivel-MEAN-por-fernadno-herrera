import { UploadedFile } from 'express-fileupload';
import { Document, Model } from 'mongoose';
import { TypesFile, TypesExtensionsCombined } from '../helpers/files.helpers';


/**
 * ? Interfaz de datos de archivo a usar en los controlladores
 * @export
 * @interface FilesData
 * @typedef {FilesData}
 */
export interface FilesData {
	id: string;
	model: Model<any>;
	typeFile: TypesFile;
	files: UploadedFile[];
	extensionsArray: TypesExtensionsCombined[];
	filesName: string[];
	filesPath: string[];
	document: Document
}
