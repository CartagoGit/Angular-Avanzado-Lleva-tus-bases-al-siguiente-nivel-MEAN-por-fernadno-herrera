import { Config } from './config.model';

export const environment: Config = new Config({
	API_PORT: 0,
	MODE: 'production',
	API_URL_BASE: '',
	GOOGLE_ID: '',
	MAPBOX_KEY:''
});


export const config = environment;
