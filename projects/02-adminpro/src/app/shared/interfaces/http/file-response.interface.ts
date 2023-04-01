import { ModelsMongo, TypesFiles } from '../models.interface';
import { TypeId } from '../models/base-model-utils.interface';

/**
 * ? Interfaz de a respuesta del back al subir archivos
 * @export
 * @interface FileResponse
 * @typedef {FileResponse}
 */
export interface FileUploadResponse {
	status_code: number;
	data: string;
	files: FileDataUpload[];
	typeFile: string;
	nameModel: string;
	idModel: string;
	filesName: string[];
	filesPath: string[];
	filesRoute: string[];
	ok: boolean;
	message: string;
	method: string;
	db_state: string;
}

/**
 * ? Interfaz con los datos de los arhivos en la respuesta del back al subir archivos
 * @export
 * @interface File
 * @typedef {File}
 */
export interface FileDataUpload {
	name: string;
	data: { type: string; data: any[] };
	size: number;
	encoding: string;
	tempFilePath: string;
	truncated: boolean;
	mimetype: string;
	md5: string;
}


/**
 * ? Interfaz de los datos necesarios basicos para enviar en la request de archivos
 * @export
 * @interface FileNeededRequest
 * @typedef {FileNeededRequest}
 */
export interface FileNeededRequest {
	id: TypeId;
	typeModel: ModelsMongo;
	typeFile: TypesFiles;
}
