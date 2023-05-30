import { Config } from './config.model';

import * as dotenv from 'dotenv';
dotenv.config();

export const environment: Config = new Config({
	API_PORT: process.env['PORT'] || undefined,
	MODE: 'production',
	API_URL_BASE: process.env['API_URL_BASE'] || '',
	GOOGLE_ID: process.env['GOOGLE_ID'] || '',
	MAPBOX_KEY: process.env['MAPBOX_KEY'] || '',
});

export const config = environment;
