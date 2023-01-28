interface ConfigProps {
	PORT: number;
	MODE: string;
	URL_BASE: string;
}

class Config implements ConfigProps {
	public PORT!: number;
	public MODE!: string;
	public URL_BASE!: string;

	get URL() {
		return this.URL_BASE + this.PORT;
	}

	constructor(data: ConfigProps) {
		this.PORT = data.PORT;
		this.MODE = data.MODE;
		this.URL_BASE = data.URL_BASE;
	}
}

export const environment: { [key in string]: Config } = {
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
