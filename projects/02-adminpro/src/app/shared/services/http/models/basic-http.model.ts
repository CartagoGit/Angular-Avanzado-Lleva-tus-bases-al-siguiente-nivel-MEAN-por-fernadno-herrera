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

/**
 * ? Clase que extenderan los modelos basicos de monboDB
 * @export
 * @class BasicHttp
 * @typedef {BasicHttp}
 * @extends {CoreHttp}
 */
export class BasicHttp extends CoreHttp {
	// ANCHOR : Constructor
	constructor(data: { modelEndpoints: Record<string, string> }) {
		const { modelEndpoints } = data;
		super({ modelEndpoints: { ...modelEndpoints, ...basicEndpoints } });
	}
}
