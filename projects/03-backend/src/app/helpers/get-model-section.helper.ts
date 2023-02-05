import { Request } from 'express';
import { Model, Document, Types } from 'mongoose';
import { ApiModels } from '../models/mongo/all.models';
import { getCapitalize } from './logs.helper';


/**
 * ? Crea y recupera un nuevo modelo de Mongo segun la URL
 * @param {Request} req
 * @returns {*}
 */
export const getNewModelSection = (
	req: Request
): Document<unknown, any, unknown> & {
	_id: Types.ObjectId;
} => {
	return new (getModelSection(req))(req.body);
};

/**
 * ? Recupera el modelo segun la url de la peticion
 * @param {Request} req
 * @returns {Model<unknown>}
 */
export const getModelSection = (req: Request): Model<unknown> => {
	return ApiModels[getCapitalize(getSectionFromUrl(req))];
};

/**
 * ? Recupera la seccion segun la url de la peticion
 * @param {Request} req
 * @returns {string}
 */
export const getSectionFromUrl = (req: Request): string => {
	const baseUrlSections = req.baseUrl.split('/');
	return baseUrlSections[baseUrlSections.length - 1];
};

/**
 * ? Recupera el metodo a usar segun la url de la peticion
 * @param {Request} req
 * @returns {string}
 */
export const getMethodFromUrl = (req: Request): string => {
	return req.originalUrl.replace(req.baseUrl + '/', '').split('/')[0];
};
