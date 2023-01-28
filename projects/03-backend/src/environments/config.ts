import { Mode, Config } from './config.model';

export const environment: Record<Mode, Config> = {
	development: new Config({
		PORT: 5000,
		MODE: 'development',
		URL_BASE: 'http://localhost:',
	}),

	production: new Config({
		PORT: Number(process.env['PORT']!),
		MODE: 'production',
		URL_BASE: process.env['URL_BASE']!,
	}),
};
