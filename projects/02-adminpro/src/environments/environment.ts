// import { hide_environments } from 'global/hide_environments';
import { Config } from './config.model';

let hide_environments: any;

try {
	hide_environments = require('global/hide_environments');
} catch (error) {
	hide_environments = {};
}

const { MAPBOX_KEY } = hide_environments;

export const environment: Config = new Config({
	API_PORT: 5000,
	MODE: 'development',
	API_URL_BASE: 'http://localhost:',
	GOOGLE_ID:
		'274390438175-u22bgdfgk1j50kt401l2kbrdedoca290.apps.googleusercontent.com',
	MAPBOX_KEY,
});

export const config = environment;
