import { Response } from 'express';

export const rootResponse = (title: string, res: Response) => {
	const message = `Root from ${
		title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
	} collection api`;

	return res.json({
		message,
		ok: true,
	});
};
