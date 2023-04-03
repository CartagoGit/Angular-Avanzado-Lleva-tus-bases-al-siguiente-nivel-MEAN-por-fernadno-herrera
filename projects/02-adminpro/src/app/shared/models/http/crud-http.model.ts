import { CoreHttp } from './core-http.model';
import { Observable, of, switchMap } from 'rxjs';
import { ModelPropsAndId } from '../../interfaces/models/base-model-utils.interface';
import { getParamsWithOptions } from '../../helpers/get-query-options.helper';
import { DefaultResponse } from '../../interfaces/http/response.interfaces';
import { QueryOptions } from '../../interfaces/http/request.interface';
import { TypeId } from '../../interfaces/models/base-model-utils.interface';
import { ModelSpecificProps } from '../../interfaces/models/base-model-utils.interface';
import { BaseModelsProps } from '../mongo-models/adds/base-models.model';

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
export class CrudHttp<
	Model extends BaseModelsProps,
	ModelEndpoints,
	Props = any
> extends CoreHttp<CrudEndpoints & ModelEndpoints> {
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
	 * ? Obtiene todos los registros de la coleccion del tipo del Modelo <Model>, con posibles parametros de paginacion
	 * @public
	 * @param {?QueryOptions<Props>} [options]
	 * @param {boolean} [useDefaultOptions=true]
	 * @returns {Observable<DefaultResponse<Model[]>>}
	 */
	public getAll(
		options?: Omit<QueryOptions<Props>, 'showParams'>,
		useDefaultOptions: boolean = true
	): Observable<DefaultResponse<Model[]>> {
		const query = undefined;
		const params = getParamsWithOptions(query, options, useDefaultOptions);
		return this._http.get<DefaultResponse<Model[]>>(
			this.getUrlEndpoint('getAll'),
			{ params }
		);
	}

	/**
	 * ? Obtiene un registro de la coleccion del tipo del Modelo <Model> por su id
	 * @public
	 * @param {TypeId} id
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public getById(id: TypeId): Observable<DefaultResponse<Model>> {
		return this._http.get<DefaultResponse<Model>>(
			this.getUrlEndpoint('getById', id)
		);
	}

	/**
	 * ? Obtiene los registros de la colleccion del modelo <Model> que cumplan con la query pasandole los parametros de paginacion
	 * @public
	 * @param {?Partial<Props>} [query]
	 * @param {?QueryOptions<Props>} [options]
	 * @param {boolean} [useDefaultOptions=true]
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public getByQuery(
		query?: Partial<Props>,
		options?: QueryOptions<Props>,
		useDefaultOptions: boolean = true
	): Observable<DefaultResponse<Model[]>> {
		const params = getParamsWithOptions(query, options, useDefaultOptions);
		return this._http
			.get<DefaultResponse<Model[]>>(this.getUrlEndpoint('getByQuery'), {
				params,
			})
			.pipe(
				//* Si el valor de la pagina es mayor al total de paginas, se vuelve a realizar la peticion con la pagina 1
				switchMap((res) => {
					const page = options?.page || 1;
					const totalPages = res.pagination?.totalPages || 0;
					if (totalPages === 0 || page <= totalPages) return of(res);

					return this.getByQuery(
						query,
						{ ...options, page: 1 },
						useDefaultOptions
					);
				})
			);
	}

	/**
	 * ? Crea un registro en la coleccion del tipo del Modelo <Model>
	 * @public
	 * @param {ModelSpecificProps<Model>} model
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public post(
		modelProps: ModelSpecificProps<Model>
	): Observable<DefaultResponse<Model>> {
		const body = { ...modelProps };
		return this._http.post<DefaultResponse<Model>>(
			this.getUrlEndpoint('post'),
			body
		);
	}

	/**
	 * ? Actualiza un registro en la coleccion del tipo del Modelo <Model>
	 * @public
	 * @param {ModelPropsAndId<Model>} modelParams
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public put(
		modelProps: ModelPropsAndId<Model>
	): Observable<DefaultResponse<Model>> {
		const { id, ...props } = modelProps;
		const body = { ...props };
		return this._http.put<DefaultResponse<Model>>(
			this.getUrlEndpoint('put', id),
			body
		);
	}

	/**
	 * ? Elimina un registro en la coleccion del tipo del Modelo <Model>
	 * @public
	 * @param {TypeId} id
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public delete(id: TypeId): Observable<DefaultResponse<Model>> {
		return this._http.delete<DefaultResponse<Model>>(
			this.getUrlEndpoint('delete', id)
		);
	}

	/**
	 * ? Elimina todos los registros de la coleccion del tipo del Modelo <Model>
	 * @public
	 * @returns {Observable<DefaultResponse<Model>>}
	 */
	public deleteCollection(): Observable<DefaultResponse<Model> | undefined> {
		return this._http.delete<DefaultResponse<Model>>(
			this.getUrlEndpoint('deleteCollection')
		);
	}
}
