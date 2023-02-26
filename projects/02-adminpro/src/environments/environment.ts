import { Config } from './config.model';

export const environment: Config = new Config({
	API_PORT: 5000,
	MODE: 'development',
	API_URL_BASE: 'http://localhost:',
	GOOGLE_ID:
		'274390438175-u22bgdfgk1j50kt401l2kbrdedoca290.apps.googleusercontent.com',
});

export const config = environment;
