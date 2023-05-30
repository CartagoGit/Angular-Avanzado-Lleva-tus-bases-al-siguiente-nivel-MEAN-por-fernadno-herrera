//* Posibles modos o estado de la aplicacion
export type Mode = 'production' | 'development';

/**
 * ? Interfaz de las propiedades de los enviornments al crear la configuracion de la app
 * @interface ConfigProps
 * @typedef {ConfigProps}
 */
interface ConfigProps {
	MODE: Mode;
	API_PORT: number | string | undefined;
	API_URL_BASE: string;
	GOOGLE_ID: string;
	MAPBOX_KEY: string;
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
	//* ConfigPropps
	public MODE!: Mode;
	public API_URL_BASE!: string;
	public GOOGLE_ID!: string;
	public API_PORT!: number | undefined;
	public MAPBOX_KEY: string;

	get API_URL() {
		return this.API_URL_BASE + (this.API_PORT || '');
	}

	get API_ENDPOINT() {
		console.log('[ URL API ] ', this.API_URL + '/api');
		return this.API_URL + '/api';
	}

	// ANCHOR : Constructor
	constructor(data: ConfigProps) {
		this.MODE = data.MODE;
		this.API_PORT = isNaN(Number(data.API_PORT))
			? undefined
			: Number(data.API_PORT);
		this.API_URL_BASE = data.API_URL_BASE;
		this.GOOGLE_ID = data.GOOGLE_ID;
		this.MAPBOX_KEY = data.MAPBOX_KEY;
	}

	// ANCHOR : Methods
}
