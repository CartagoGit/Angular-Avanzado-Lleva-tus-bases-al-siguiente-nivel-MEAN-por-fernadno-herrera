import { config } from 'projects/02-adminpro/src/environments/environment';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../interfaces/response.interfaces';

/**
 * ? Core que deben extender todas los servicios http
 * @export
 * @class CoreHttp
 * @typedef {CoreHttp}
 */
export class CoreHttp {
	// ANCHOR : Variables
	public apiUrl = config.API_ENDPOINT;
	public endpoints;
	public routes!: { [key in keyof typeof this.endpoints]: string };
	public _modelRouteEndpoint: string;

	public get middleRoute() {
		return this.apiUrl + this._middleRoutes;
	}

	public get modelRoute() {
		return this.middleRoute + this._modelRouteEndpoint;
	}

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

		this._modelRouteEndpoint = modelRouteEndpoint;
		this._middleRoutes =
			middleRoutes.length === 0 ? '' : middleRoutes.join('');

		this.endpoints = { ...this._coreEndpoints, ...modelEndpoints };
		Object.keys(this.endpoints).forEach((key) => {
			this.routes = {
				...this.routes,
				[key]: this.getUrlEndpoint(key as keyof typeof this.endpoints),
			};
		});

		this._http = new HttpClient(
			new HttpXhrBackend({
				build: () => new XMLHttpRequest(),
			})
		);

		console.log(this);
	}

	// ANCHOR : Métodos

	/**
	 * ? Recupera el url segun el endpoint
	 * @public
	 * @param {keyof typeof this.endpoints} endpoint
	 * @returns {string}
	 */
	public getUrlEndpoint(endpoint: keyof typeof this.endpoints): string {
		if (!this.endpoints[endpoint]) throw new Error('Invalid endpoint');
		return this.modelRoute + this.endpoints[endpoint];
	}

	/**
	 * ? Observable a la request al root
	 * @public
	 * @returns {Observable<DefaultResponse>}
	 */
	public getRoot(): Observable<DefaultResponse> {
		return this._http.get<DefaultResponse>(this.routes.root);
	}
}
