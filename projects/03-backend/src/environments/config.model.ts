import { hide_environments } from 'global/hide_environments';

//? Example for hide environments
// interface HideEnvironmentsProps {
// 	MONGO_CLUSTER: string;
// 	MONGO_PASSWORD: string;
// 	MONGO_USERNAME: string;
// 	MONGO_OPTIONS?: {};
//    MONGO_DB?: string;
// }
// export const hide_environments = {
// 	MONGO_CLUSTER : 'backend-angular-avanzad.pei57e6',
// 	MONGO_USERNAME : 'yyy',
// 	MONGO_PASSWORD: 'xxx'
//    MONGO_OPTIONS: {
//		   retryWrites: true,
//		   w: 'majority',
//	   },
//    MONGO_DB: 'hospitalApp'
// }

export type Mode = 'production' | 'development';

interface ConfigProps {
	PORT: number;
	MODE: Mode;
	API_URL_BASE: string;
}

export class Config implements ConfigProps {
	// ANCHOR : Variables
	public PORT!: number;
	public MODE!: Mode;
	public API_URL_BASE!: string;
	private _MONGO_PASSWORD: string = hide_environments.MONGO_PASSWORD;
	private _MONGO_USERNAME: string = hide_environments.MONGO_USERNAME;
	private _MONGO_CLUSTER: string = hide_environments.MONGO_CLUSTER;
	private _MONGO_OPTIONS: {} = hide_environments.MONGO_OPTIONS || {};
	private _MONGO_DB: string = hide_environments.MONGO_DB || '';

	get API_URL() {
		return this.API_URL_BASE + this.PORT;
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
		return this.MONGO_URL_DB + this._getMongoOptionsParams();
	}

	get MONGO_DB_NAME() {
		return this._MONGO_DB;
	}

	get MONGO_OPTIONS() {
		return this._MONGO_OPTIONS;
	}

	// ANCHOR : Constructor
	constructor(data: ConfigProps) {
		this.PORT = data.PORT;
		this.MODE = data.MODE;
		this.API_URL_BASE = data.API_URL_BASE;
	}

	// ANCHOR : Methods
	private _getMongoOptionsParams(): string {
		let params: string = '';
		for (let [key, value] of Object.entries(this._MONGO_OPTIONS)) {
			if (params !== '') params += '&';
			else params += '?';
			params += key + '=' + value;
		}
		return params;
	}
}
