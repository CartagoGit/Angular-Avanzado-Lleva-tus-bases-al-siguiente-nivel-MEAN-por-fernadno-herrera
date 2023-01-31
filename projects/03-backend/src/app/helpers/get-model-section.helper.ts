import { Request } from 'express';
import { Model } from 'mongoose';
import { ApiModels } from '../models/mongo/all.models';
import { getCapitalize } from './get-capitalize.helper';

export const getNewModelSection = (req: Request) => {
	return new (getModelSection(req))(req.body);
};

export const getModelSection = (req: Request): Model<unknown> => {
	return ApiModels[getCapitalize(getSectionFromUrl(req))];
};

export const getSectionFromUrl = (req: Request) => {
	const baseUrlSections = req.baseUrl.split('/');
	return baseUrlSections[baseUrlSections.length - 1];
};
