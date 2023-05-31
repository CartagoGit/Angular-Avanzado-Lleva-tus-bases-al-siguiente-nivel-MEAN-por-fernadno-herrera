// import { hide_environments } from '../../../../global/hide_environments';
import { getSha256 } from '../app/helpers/encrypt.helper';
import { OAuth2Client } from 'google-auth-library';

//? Example for hide environments
// interface HideEnvironmentsProps {
// 	MONGO_CLUSTER: string;
// 	MONGO_PASSWORD: string;
// 	MONGO_USERNAME: string;
// 	MONGO_OPTIONS?: {}  | string;
//    MONGO_DB?: string;
//    JWT_SECRET: string;
//		GOOGLE_SECRET: string;
//    MAPBOX_KEY: string;
// }
// export const hide_environments = {
// 	MONGO_CLUSTER : 'backend-angular-avanzad.pei57e6',
// 	MONGO_USERNAME : 'yyy',
// 	MONGO_PASSWORD: 'xxx'
//    MONGO_OPTIONS: {
//		   retryWrites: true,
//		   w: 'majority',
//	   },
//    MONGO_DB: 'hospitalApp',
//    JWT_SECRET: 'una_clave_secreta_oculta"
// 	GOOGLE_SECRET: 'la_clave_secreta_de_google'
//    MAPBOX_KEY: 'el token de map box
// }

let hide_environments: any;

try {
	hide_environments = require('../../../../global/hide_environments');
} catch (error) {
	hide_environments = {};
}

//* Posibles modos o estado de la aplicacion
export type Mode = 'production' | 'development';

/**
 * ? Interfaz de las propiedades de los enviornments al crear la configuracion de la app
 * @interface ConfigProps
 * @typedef {ConfigProps}
 */
interface ConfigProps {
	PORT: number | undefined;
	MODE: Mode;
	API_URL_BASE: string;
	GOOGLE_ID: string;
}

/**
 * ? Archivo de configuracion inicial del servidor express y mongoDb
 * @export
 * @class Config
 * @typedef {Config}
 * @implements {ConfigProps}
 */
export class Config implements ConfigProps {
	// ANCHOR : Variables
	//* ConfigProps
	public PORT: number | undefined = undefined;
	public MODE!: Mode;
	public API_URL_BASE!: string;
	public GOOGLE_ID!: string;

	//* Otras props
	// public BASE_FOLDER: string = `${__dirname}`;
	// public BASE_FOLDER: string = `${this.API_URL_BASE}`;
	// public UPLOAD_FOLDER: string = `${this.BASE_FOLDER}/uploads`;
	// public UPLOAD_FOLDER: string = `/uploads`;
	public GOOGLE_CLIENT!: { GOOGLE_ID: string; GOOGLE_CLIENT: OAuth2Client };
	private _MONGO_PASSWORD: string =
		process.env['MONGO_PASSWORD'] || hide_environments?.MONGO_PASSWORD;
	private _MONGO_USERNAME: string =
		process.env['MONGO_USERNAME'] || hide_environments?.MONGO_USERNAME;
	private _MONGO_CLUSTER: string =
		process.env['MONGO_CLUSTER'] || hide_environments?.MONGO_CLUSTER;
	private _MONGO_OPTIONS: {} | string =
		process.env['MONGO_OPTIONS'] || hide_environments?.MONGO_OPTIONS || {};
	private _MONGO_DB: string =
		process.env['MONGO_DB'] || hide_environments?.MONGO_DB || '';
	private _JWT_SECRET: string =
		process.env['JWT_SECRET'] || hide_environments?.JWT_SECRET;
	private _GOOGLE_SECRET: string =
		process.env['GOOGLE_SECRET'] || hide_environments?.JWT_SECRET;

	get API_URL() {
		return this.API_URL_BASE + (this.PORT ?? '') + '/api';
	}

	get UPLOAD_FOLDER() {
		// return `${this.API_URL}/uploads`
		return `${__dirname}/uploads`;
	}

	get DEFAULT_IMAGE() {
		return `${__dirname}/public/assets/images/no-image.jpg`;
	}

	get MONGO_URL() {
		return (
			'mongodb+srv://' +
			this._MONGO_USERNAME +
			':' +
			this._MONGO_PASSWORD +
			'@' +
			this._MONGO_CLUSTER +
			'.mongodb.net/'
		);
	}
	get MONGO_URL_DB() {
		return this.MONGO_URL + this._MONGO_DB;
	}

	get MONGO_URL_COMPLETE() {
		return this.MONGO_URL_DB + this._getParamsFromObject(this.MONGO_OPTIONS);
	}

	get MONGO_DB_NAME() {
		return this._MONGO_DB;
	}

	get MONGO_OPTIONS() {
		if (typeof this._MONGO_OPTIONS === 'string')
			return this._getObjectFromParams(this._MONGO_OPTIONS);
		return this._MONGO_OPTIONS;
	}

	get JWT_SECRET() {
		return getSha256(this._JWT_SECRET + this._MONGO_PASSWORD);
	}

	// ANCHOR : Constructor
	constructor(data: ConfigProps) {
		this.PORT = data.PORT;
		this.MODE = data.MODE;
		this.API_URL_BASE = data.API_URL_BASE;
		this.GOOGLE_ID = data.GOOGLE_ID;
		this.GOOGLE_CLIENT = {
			GOOGLE_ID: this.GOOGLE_ID,
			GOOGLE_CLIENT: new OAuth2Client(this._GOOGLE_SECRET),
		};
	}

	// ANCHOR : Methods
	private _getParamsFromObject(objectToParse: object | string): string {
		if (typeof objectToParse === 'string') return objectToParse;
		let params: string = '';
		for (let [key, value] of Object.entries(objectToParse)) {
			if (params !== '') params += '&';
			else params += '?';
			params += key + '=' + value;
		}
		return params;
	}

	private _getObjectFromParams(params: string | object): object {
		if (typeof params === 'object') return params;
		// params = params.replace('?"\'', '');
		const arrayParams = params
			.split('')
			.filter((value) => value !== '"' && value !== "'" && value !== '?')
			.join('')
			.split('&');

		let objectWithParams = {};
		for (let pair of arrayParams) {
			const [key, value] = pair.split('=');
			objectWithParams = {
				...objectWithParams,
				[key]: value,
			};
		}
		return objectWithParams;
	}
}
