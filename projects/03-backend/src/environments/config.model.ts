import { hide_environments } from 'global/hide_environments';

//? Example for hide environments
// interface HideEnvironmentsProps {
// 	MONGO_CLUSTER: string;
// 	MONGO_PASSWORD: string;
// 	MONGO_USERNAME: string;
// 	MONGO_OPTIONS?: {};
// }
// export const hide_environments = {
// 	MONGO_CLUSTER : 'backend-angular-avanzad.pei57e6',
// 	MONGO_USERNAME : 'yyy',
// 	MONGO_PASSWORD: 'xxx'
//    MONGO_OPTIONS: {
//		   retryWrites: true,
//		   w: 'majority',
//	   },
// }

export type Mode = 'production' | 'development';

interface ConfigProps {
	PORT: number;
	MODE: Mode;
	URL_BASE: string;
}

export class Config implements ConfigProps {
	public PORT!: number;
	public MODE!: Mode;
	public URL_BASE!: string;
	private _MONGO_PASSWORD: string = hide_environments.MONGO_PASSWORD;
	private _MONGO_USERNAME: string = hide_environments.MONGO_USERNAME;
	private _MONGO_CLUSTER: string = hide_environments.MONGO_CLUSTER;
	private _MONGO_OPTIONS: {} = hide_environments.MONGO_OPTIONS || {};

	get URL() {
		return this.URL_BASE + this.PORT;
	}

	get MONGO_URL() {
		return (
			'mongodb+srv://' +
			this._MONGO_USERNAME +
			':' +
			this._MONGO_PASSWORD +
			'@' +
			this._MONGO_CLUSTER +
			'.mongodb.net/' +
			this._getMongoOptionsParams()
		);
	}

	constructor(data: ConfigProps) {
		this.PORT = data.PORT;
		this.MODE = data.MODE;
		this.URL_BASE = data.URL_BASE;
	}

	private _getMongoOptionsParams() {
		let params: string = '';
		for (let [key, value] of Object.entries(this._MONGO_OPTIONS)) {
			if (params !== '') params += '&';
			else params += '?';
			params += key + '=' + value;
		}
		return params;
	}
}
