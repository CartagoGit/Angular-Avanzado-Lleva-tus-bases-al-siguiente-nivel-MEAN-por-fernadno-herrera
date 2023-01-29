import { Request } from 'express';

export const getSectionFromUrl = (req: Request) => {
	const baseUrlSections = req.baseUrl.split('/');
	return baseUrlSections[baseUrlSections.length - 1];
};
