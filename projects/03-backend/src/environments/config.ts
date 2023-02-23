import { Mode, Config } from './config.model';

export const environment: Record<Mode, Config> = {
	development: new Config({
		PORT: 5000,
		MODE: 'development',
		API_URL_BASE: 'http://localhost:',
		GOOGLE_ID: '274390438175-u22bgdfgk1j50kt401l2kbrdedoca290.apps.googleusercontent.com',
		// GOOGLE_URL : ''
	}),

	production: new Config({
		PORT: Number(process.env['PORT']!),
		MODE: 'production',
		API_URL_BASE: process.env['URL_BASE']!,
		GOOGLE_ID: process.env['GOOGLE_ID']!
	}),
};

export const config =
	environment[!!process.env['PORT'] ? 'production' : 'development'];
