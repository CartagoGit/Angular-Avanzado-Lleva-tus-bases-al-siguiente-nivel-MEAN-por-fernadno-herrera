import { Request } from 'express';
import { ApiModels } from '../models/mongo/all.models';
import { getCapitalize } from './get-capitalize.helper';
import { getSectionFromUrl } from './get-section-from-url.helper';

export const getModelSection = (req: Request) => {
	return new ApiModels[getCapitalize(getSectionFromUrl(req))](req.body);
};
