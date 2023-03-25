import { Request } from 'express';
import { PaginationParameters } from 'mongoose-paginate-v2';
import { getModelSection } from './get-model-section.helper';
import { ReturnedQuery } from '../interfaces/query.interface';

/**
 * ? Retorna si la busqueda debe ser inclusiva, los query parametros, y las opciones de paginacion incluidas en el query
 * * Valor opcional, retornar los parametros del query no incluidos para paginacion
 * @param {Request} req
 * @param {{ returnQueryModels?: boolean }} [options={}]
 * @returns {ReturnedQuery}
 */
export const getQueryIncludeAndPaginate = (
	req: Request,
	options: { returnQueryModels?: boolean } = {}
): ReturnedQuery => {
	const { returnQueryModels = false } = options;
	if (req.query['include'] === undefined) req.query['include'] = 'true';
	const wantInclude =
		(req.query['include'] as string).toLowerCase() === 'true';
	delete req.query['include'];
	let queryParams = req.query;
	const optionsPaginate = new PaginationParameters(req).get()[1];

	let optionalReturn: undefined | object = undefined;

	//* En caso de querer retornar los valores del modelo que se encuentran en el query
	if (returnQueryModels) {
		const model = getModelSection(req);
		const paramsInModel = Object.keys(model.schema.obj);

		//* En caso de incluir "include" en el query, hacemos que los string sean inclusivos
		const arrayQuery = Object.entries(queryParams)
			.filter(([key]) => paramsInModel.includes(key))
			.map(([key, value]) => {
				return {
					[key]:
						wantInclude && typeof value === 'string'
							? RegExp(value as string, 'i')
							: value,
				};
			});

		//* Asignamos el objeto que se buscara con los RegExp en caso de incluirlos en el paginate
		let objectQuery = {};
		for (const keyValue of arrayQuery) {
			objectQuery = { ...objectQuery, ...keyValue };
		}

		//* Extraemos los parametros recibidos que se encuentran en el modelo para mostrarlos en la response
		let modelParamsInQuery = {};
		for (const key of Object.keys(objectQuery)) {
			modelParamsInQuery = {
				...modelParamsInQuery,
				[key]: queryParams[key],
			};
		}

		//* Añadimos los parametros a devolver
		optionalReturn = {
			model,
			arrayQuery,
			objectQuery,
			modelParamsInQuery,
		};
	}
	let returnedObject: ReturnedQuery = {
		wantInclude,
		queryParams,
		optionsPaginate,
	};

	//* Si existen retorno de query del modelo añadimos los valroes opcionales
	if (!!optionalReturn)
		returnedObject = { ...returnedObject, ...(optionalReturn as object) };

	return returnedObject;
};
