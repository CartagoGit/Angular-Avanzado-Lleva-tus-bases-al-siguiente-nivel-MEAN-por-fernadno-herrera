import { config } from 'projects/02-adminpro/src/environments/environment';

/**
 * ? Core que deben extender todas los servicios http
 * @export
 * @class CoreHttp
 * @typedef {CoreHttp}
 */
export class CoreHttp {
	// ANCHOR : Variables
	protected _apiUrl = config.API_ENDPOINT;
	private _coreEndpoints = {
		root: '/root',
	};

	protected _endpoints = {};

	// ANCHOR : Constructor
	constructor(private _data: { modelEndpoints: Record<string, string> }) {
		const { modelEndpoints } = this._data;

		this._endpoints = { ...this._coreEndpoints, ...modelEndpoints };
	}

	// ANCHOR : Métodos
	protected _endpoint(endpoint: keyof typeof this._endpoints) {
		if (!this._endpoints[endpoint]) throw new Error('Invalid endpoint');
		return this._apiUrl + this._endpoints[endpoint];
	}
}
