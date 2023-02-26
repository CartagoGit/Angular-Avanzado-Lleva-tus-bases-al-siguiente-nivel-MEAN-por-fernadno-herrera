//* Posibles modos o estado de la aplicacion
export type Mode = 'production' | 'development';

/**
 * ? Interfaz de las propiedades de los enviornments al crear la configuracion de la app
 * @interface ConfigProps
 * @typedef {ConfigProps}
 */
interface ConfigProps {
	MODE: Mode;
	API_PORT: number;
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
	//* ConfigPropps
	public MODE!: Mode;
	public API_URL_BASE!: string;
	public GOOGLE_ID!: string;
	public API_PORT!: number;

	get API_URL() {
		return this.API_URL_BASE + this.API_PORT;
	}

	get API_ENDPOINT() {
		return this.API_URL + '/api';
	}

	// ANCHOR : Constructor
	constructor(data: ConfigProps) {
		this.MODE = data.MODE;
		this.API_PORT = data.API_PORT;
		this.API_URL_BASE = data.API_URL_BASE;
		this.GOOGLE_ID = data.GOOGLE_ID;
	}

	// ANCHOR : Methods
}
