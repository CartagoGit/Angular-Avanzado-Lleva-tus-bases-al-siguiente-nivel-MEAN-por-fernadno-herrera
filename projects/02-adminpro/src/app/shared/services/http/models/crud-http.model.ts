import { CoreHttp } from './core-http.model';
import { DefaultResponse } from '../interfaces/response.interfaces';
import { Observable } from 'rxjs';
import { QueryOptions } from '../interfaces/request.interface';
import { BaseModelsProps } from '../../../models/mongo-models/base-model.interface';

/**
 * ? Objeto con las rutas basicas del crud
 * @type {{ getAll: string; getById: string; getByQuery: string; post: string; put: string; delete: string; deleteCollection: string; }}
 */
const crudEndpoints: {
	getAll: string;
	getById: string;
	getByQuery: string;
	post: string;
	put: string;
	delete: string;
	deleteCollection: string;
} = {
	getAll: '/get-all',
	getById: '/get-by-id/',
	getByQuery: '/get-by-query',
	post: '/post',
	put: '/put/',
	delete: '/delete/',
	deleteCollection: '/delete-collection',
};
//* Tipado de las rutas basicas para los modelos para realizar el crud
type CrudEndpoints = typeof crudEndpoints;

/**
 * ? Clase que extienden los modelos basicos de monboDB para realizar el crud basico
 * @export
 * @class CrudHttp
 * @typedef {CrudHttp}
 * @template T
 * @extends {CoreHttp<typeof crudEndpoints & T>}
 */
export class CrudHttp<Model extends BaseModelsProps, ModelEndpoints, Props = any> extends CoreHttp<
	CrudEndpoints & ModelEndpoints
> {
	// ANCHOR : Constructor
	constructor(_data: {
		modelEndpoints: ModelEndpoints;
		middleRoutes?: string[];
		modelRouteEndpoint: string;
	}) {
		const { modelEndpoints, ...rest } = _data;
		super({
			modelEndpoints: { ...crudEndpoints, ...modelEndpoints },
			...rest,
		});
	}

	// ANCHOR : Methods

	/**
	 * ? Obtiene todos los registros de la coleccion del tipo del Modelo <Model>
	 * @public
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public getAll(): Observable<DefaultResponse<Model[]>> {
		return this._http.get<DefaultResponse<Model[]>>(
			this.getUrlEndpoint('getAll')
		);
	}

	/**
	 * ? Obtiene un registro de la coleccion del tipo del Modelo <Model> por su id
	 * @public
	 * @param {string} id
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public getById(id: string): Observable<DefaultResponse<Model>> {
		return this._http.get<DefaultResponse<Model>>(
			this.getUrlEndpoint('getById', id)
		);
	}

	public getByQuery(
		//TODO
		query?: Partial<Props>,
		options?: QueryOptions<Props>
	): Observable<DefaultResponse<Model>> {
		return this._http.get<DefaultResponse<Model>>(
			this.getUrlEndpoint('getByQuery'),
			{ params: { ...query } }
		);
	}


	/**
	 * ? Crea un registro en la coleccion del tipo del Modelo <Model>
	 * @public
	 * @param {Model} model
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public post(model: Model): Observable<DefaultResponse<Model>> {
		return this._http.post<DefaultResponse<Model>>(
			this.getUrlEndpoint('post'),
			{ body: { ...model } }
		);
	}


	/**
	 * ? Actualiza un registro en la coleccion del tipo del Modelo <Model>
	 * @public
	 * @param {Model} model
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public put(model: Model): Observable<DefaultResponse<Model>> {
		return this._http.put<DefaultResponse<Model>>(
			this.getUrlEndpoint('put', model.id),
			{ body: { ...model } }
		);
	}


	/**
	 * ? Elimina un registro en la coleccion del tipo del Modelo <Model>
	 * @public
	 * @param {string} id
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public delete(id: string): Observable<DefaultResponse<Model>> {
		return this._http.delete<DefaultResponse<Model>>(
			this.getUrlEndpoint('delete', id)
		);
	}


	/**
	 * ? Elimina todos los registros de la coleccion del tipo del Modelo <Model>
	 * @public
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public deleteCollection(): Observable<DefaultResponse<Model>> {
		return this._http.delete<DefaultResponse<Model>>(
			this.getUrlEndpoint('deleteCollection')
		);
	}

	
}
