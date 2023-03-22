import { CoreHttp } from './core-http.model';
import { DefaultResponse } from '../interfaces/response.interfaces';
import { Observable } from 'rxjs';

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
export class CrudHttp<Model, ModelEndpoints> extends CoreHttp<
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
	public getAll(): Observable<DefaultResponse<Model>> {
		return this._http.get<DefaultResponse<Model>>(
			this.getUrlEndpoint('getAll')
		);
	}
}
