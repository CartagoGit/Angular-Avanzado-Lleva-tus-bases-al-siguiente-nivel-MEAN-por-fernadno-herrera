import { CoreHttp } from './core-http.model';

/**
 * ? Objeto con las rutas basicas
 * @type {{ getAll: string; getById: string; getByQuery: string; post: string; put: string; delete: string; deleteCollection: string; }}
 */
const basicEndpoints: {
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
//* Tipado de las rutas basicas para los modelos
type Endpoints = typeof basicEndpoints;

/**
 * ? Clase que extienden los modelos basicos de monboDB
 * @export
 * @class BasicHttp
 * @typedef {BasicHttp}
 * @template T
 * @extends {CoreHttp<typeof basicEndpoints & T>}
 */
export class BasicHttp<T> extends CoreHttp<Endpoints & T> {
	
	// ANCHOR : Constructor
	constructor(_data: {
		modelEndpoints: T;
		middleRoutes?: string[];
		modelRouteEndpoint: string;
	}) {
		const { modelEndpoints, ...rest } = _data;
		super({
			modelEndpoints: { ...basicEndpoints, ...modelEndpoints },
			...rest,
		});
	}
}
