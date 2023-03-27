import { Injectable } from '@angular/core';
import { CoreHttp } from './models/core-http.model';
import { FileUploadResponse } from '../../interfaces/http/file-response.interface';
import { map, Observable } from 'rxjs';
import { ModelsMongo, TypesFiles } from '../../interfaces/models.interface';
/**
 * ? Endpoints del modelo
 * @type {{ renewToken: string; login: string; googleLogin: string; googleClientId: string; }}
 */
const modelEndpoints: {
	uploadFile: string;
	downloadFile: string;
	downloadFirstFile: string;
} = {
	uploadFile: '/upload', // -> /upload/users/images/63fd01a864cb17db71945605?replace_all=true
	downloadFile: '/download', // -> /download/doctors/images/63e93f9590e9224f4c9acaa8/doctor_images_63e93f9590e9224f4c9acaa8_c5bd9f32-7749-4e84-a8f1-c862796655a9.jpg
	downloadFirstFile: '/download', // -> /download/users/images/63fd01a864cb17db71945605
};
//* Tipado de los endpoints del modelo
type Endpoints = typeof modelEndpoints;

//* Ruta del modelo
const modelRouteEndpoint = '/files';

@Injectable({
	providedIn: 'root',
})
export class FilesService extends CoreHttp<Endpoints> {
	// ANCHOR : Constructor
	constructor() {
		super({ modelEndpoints, modelRouteEndpoint });

	}

	// ANCHOR : Métodos

	/**
	 * ? Observable para subir un archivo a la BD
	 * @public
	 * @param {{
				id: string;
				filesToUpload: File[];
				typeModel: ModelsMongo;
				typeFile: TypesFiles;
			}} data
	 * @param {?{ replaceAll?: boolean; replace?: boolean }} [options]
	 * @returns {Observable<FileUploadResponse>}
	 */
	public uploadFile(
		data: {
			id: string;
			filesToUpload: File[];
			typeModel: ModelsMongo;
			typeFile: TypesFiles;
		},
		options?: { replaceAll?: boolean; replace?: boolean }
	): Observable<FileUploadResponse> {
		const { id, filesToUpload, typeFile, typeModel } = data;
		const { replace = false, replaceAll = true } = options || {};
		const params = { replace, replaceAll };
		const formData = new FormData();
		filesToUpload.forEach((file) => formData.append('filesArray', file));
		return this._http.put<FileUploadResponse>(
			`${this.routes.uploadFile}/${typeModel}/${typeFile}/${id}`,
			formData,
			{
				params,
			}
		);
	}

	/**
	 * ? Descarga el primer archivo del tipo y el modelo de la BD
	 * @public
	 * @param {{
			id: string;
			typeModel: ModelsMongo;
			typeFile: TypesFiles;
		}} data
	 * @returns {Observable<string>}
	 */
	public downloadFirstFile(data: {
		id: string;
		typeModel: ModelsMongo;
		typeFile: TypesFiles;
	}): Observable<string> {
		const { id, typeModel, typeFile } = data;
		return this._http
			.get(
				`${this.routes.downloadFirstFile}/${typeModel}/${typeFile}/${id}`,
				{
					responseType: 'blob',
				}
			)
			.pipe(map((blob) => URL.createObjectURL(blob)));
	}

	/**
	 * ? Descarga el archivo expecifico del tipo y el modelo de la BD
	 * @public
	 * @param {{
			id: string;
			typeModel: ModelsMongo;
			typeFile: TypesFiles;
			fileName: string;
		}} data
	 * @returns {Observable<string>}
	 */
	public downloadFile(data: {
		id: string;
		typeModel: ModelsMongo;
		typeFile: TypesFiles;
		fileName: string;
	}): Observable<string> {
		const { id, typeModel, typeFile } = data;
		return this._http
			.get(`${this.routes.downloadFile}/${typeModel}/${typeFile}/${id}`, {
				responseType: 'blob',
			})
			.pipe(map((blob) => URL.createObjectURL(blob)));
	}

	/**
	 * ? Descarga el archivo expecifico del tipo y el modelo de la BD por su ruta completa
	 * @public
	 * @param {string} path
	 * @returns {Observable<string>}
	 */
	public downloadFileFullPath(path: string): Observable<string> {
		return this._http
			.get(path, {
				responseType: 'blob',
			})
			.pipe(
				map((blob) => {
					return URL.createObjectURL(blob);
				})
			);
	}
}
