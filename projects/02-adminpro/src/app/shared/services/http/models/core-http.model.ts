import { config } from 'projects/02-adminpro/src/environments/environment';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * ? Core que deben extender todas los servicios http
 * @export
 * @class CoreHttp
 * @typedef {CoreHttp}
 */
export class CoreHttp {
	// ANCHOR : Variables
	protected _apiUrl = config.API_ENDPOINT;
	protected _endpoints;
	protected _modelRouteEndpoint: string;
	protected _http: HttpClient;
	protected _middleRoutes: string;

	private _coreEndpoints = {
		root: '/',
	};

	// ANCHOR : Constructor
	constructor(
		private _data: {
			modelEndpoints?: Record<string, string>;
			modelRouteEndpoint: string;
			middleRoutes?: string[];
		}
	) {
		const {
			modelEndpoints = {},
			modelRouteEndpoint,
			middleRoutes = [],
		} = this._data;

		this._endpoints = { ...this._coreEndpoints, ...modelEndpoints };
		this._modelRouteEndpoint = modelRouteEndpoint;
		this._middleRoutes =
			middleRoutes.length === 0 ? '' : middleRoutes.join('');

		this._http = new HttpClient(
			new HttpXhrBackend({
				build: () => new XMLHttpRequest(),
			})
		);

		console.log(_data);
	}

	// ANCHOR : Métodos
	protected _endpoint(endpoint: keyof typeof this._endpoints) {
		if (!this._endpoints[endpoint]) throw new Error('Invalid endpoint');
		return (
			this._apiUrl +
			this._middleRoutes +
			this._modelRouteEndpoint +
			this._endpoints[endpoint]
		);
	}

	public getRoot(): Observable<any> {
		console.log(this._endpoint('root'));
		return this._http.get(this._endpoint('root'));
	}
}
