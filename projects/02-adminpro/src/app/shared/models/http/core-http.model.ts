import { config } from 'projects/02-adminpro/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';

import { ServiceLocator } from '../../services/injector/locator.service';
import { DefaultResponse } from '../../interfaces/http/response.interfaces';
import { TypeId } from '../../interfaces/models/base-model-utils.interface';

/**
 * ? Core que deben extender todas los servicios http
 * @export
 * @class CoreHttp
 * @typedef {CoreHttp}
 */
export class CoreHttp<Endpoints> {
	// ANCHOR : Variables
	public apiUrl = config.API_ENDPOINT;
	public endpoints!: {
		root: '/';
	} & Endpoints;
	public routes!: Record<keyof typeof this.endpoints, string>;
	public _modelRouteEndpoint!: string;
	public isPossibleSub = true;

	public get middleRoute() {
		return this.apiUrl + this._middleRoutes;
	}

	public get modelRoute() {
		return this.middleRoute + this._modelRouteEndpoint;
	}

	protected _http!: HttpClient;
	protected _middleRoutes!: string;
	protected _timer = 700;

	private _coreEndpoints: { root: '/' } = {
		root: '/',
	};

	// ANCHOR : Constructor
	constructor(
		private _data: {
			modelEndpoints?: Endpoints;
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

		this.endpoints = {
			...this._coreEndpoints,
			...(modelEndpoints as Endpoints),
		};
		Object.keys(this.endpoints).forEach((key) => {
			this.routes = {
				...this.routes,
				[key]: this.getUrlEndpoint(
					key as keyof ({
						root: '/';
					} & Endpoints)
				),
			};
		});

		this._http = ServiceLocator.injector.get(HttpClient);
	}

	/**
	 * ? Recupera Si es posible activar la subscripcion, y en dicho caso activa un timer
	 * @protected
	 * @returns {boolean}
	 */
	protected _isPossibleAndTimer(time?: number): boolean {
		if (!this.isPossibleSub) return false;
		this.isPossibleSub = false;
		timer(time || this._timer).subscribe(() => (this.isPossibleSub = true));
		return true;
	}

	/**
	 * ? Recupera el url segun el endpoint
	 * @public
	 * @template Model
	 * @param {keyof ({
				root: '/';
			} & Endpoints)} endpoint
	 * @param {?TypeId} [id]
	 * @returns {string}
	 */
	public getUrlEndpoint(
		endpoint: keyof ({
			root: '/';
		} & Endpoints),
		id?: TypeId
	): string {
		if (!this.endpoints[endpoint]) throw new Error('Invalid endpoint');
		return this.modelRoute + this.endpoints[endpoint] + (id || '');
	}

	/**
	 * ? Observable a la request al root
	 * @public
	 * @returns {Observable<DefaultResponse>}
	 */
	public root(): Observable<DefaultResponse> {
		return this._http.get<DefaultResponse>(this.routes.root);
	}
}
