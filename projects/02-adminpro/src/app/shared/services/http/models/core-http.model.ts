import { config } from 'projects/02-adminpro/src/environments/environment';
import {
	HttpClient,
	HttpXhrBackend,
	JsonpClientBackend,
} from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { DefaultResponse } from '../interfaces/response.interfaces';
import { Inject } from '@angular/core';
import { ServiceLocator } from '../../injector/locator.service';

/**
 * ? Core que deben extender todas los servicios http
 * @export
 * @class CoreHttp
 * @typedef {CoreHttp}
 */
export class CoreHttp<T> {
	// ANCHOR : Variables
	public apiUrl = config.API_ENDPOINT;
	public endpoints!: {
		root: string;
	} & T;
	public routes!: Record<keyof typeof this.endpoints, string>;
	public _modelRouteEndpoint!: string;

	public get middleRoute() {
		return this.apiUrl + this._middleRoutes;
	}

	public get modelRoute() {
		return this.middleRoute + this._modelRouteEndpoint;
	}

	protected _http!: HttpClient;
	protected _middleRoutes!: string;
	protected _iPossibleSub = true;
	protected _timer = 700;

	private _coreEndpoints = {
		root: '/',
	};

	// ANCHOR : Constructor
	constructor(
		private _data: {
			modelEndpoints?: T;
			modelRouteEndpoint: string;
			middleRoutes?: string[];
		}
	) {
		this._createRoutesAndEndpoints();
	}

	// ANCHOR : Métodos

	/**
	 * ? Crea las rutas y endpoints del servicio http
	 * @private
	 */
	private _createRoutesAndEndpoints() {
		const {
			modelEndpoints = {},
			modelRouteEndpoint,
			middleRoutes = [],
		} = this._data;

		this._modelRouteEndpoint = modelRouteEndpoint;
		this._middleRoutes =
			middleRoutes.length === 0 ? '' : middleRoutes.join('');

		this.endpoints = { ...this._coreEndpoints, ...(modelEndpoints as T) };
		Object.keys(this.endpoints).forEach((key) => {
			this.routes = {
				...this.routes,
				[key]: this.getUrlEndpoint(key as keyof typeof this.endpoints),
			};
		});

		// this._http = new HttpClient(
		// 	new HttpXhrBackend({
		// 		build: () => new XMLHttpRequest(),
		// 		// build: () => new JsonpClientBackend(),
		// 	})
		// );
		this._http = ServiceLocator.injector.get(HttpClient);

		// this._http = HttpClient.ɵfac
	}

	/**
	 * ? Recupera Si es posible activar la subscripcion, y en dicho caso activa un timer
	 * @protected
	 * @returns {boolean}
	 */
	protected _isPossibleAndTimer(): boolean {
		if (!this._iPossibleSub) return false;
		this._iPossibleSub = false;
		timer(this._timer).subscribe(() => (this._iPossibleSub = true));
		return true;
	}

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
