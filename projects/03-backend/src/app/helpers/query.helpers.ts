import { Request } from 'express';
import { PaginationParameters } from 'mongoose-paginate-v2';
import { getModelSection } from './get-model-section.helper';
import { QueryOptions, ReturnedQuery } from '../interfaces/query.interface';

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
	const model = getModelSection(req);
	const optionsFromQuery: QueryOptions<typeof model.schema.obj> = req.query[
		'options'
	] as object;
	console.log("❗optionsFromQuery ➽ ⏩" , optionsFromQuery);
	req.query['options'] = optionsFromQuery as any;
	let queryParams = req.query;

	const wantInclude = optionsFromQuery?.include ?? true;

	const optionsPaginate = new PaginationParameters({
		query: optionsFromQuery,
	}).get()[1];

	let optionalReturn: undefined | object = undefined;

	//* En caso de querer retornar los valores del modelo que se encuentran en el query
	if (returnQueryModels) {
		const paramsInModel = Object.keys(model.schema.obj);

		//* En caso de incluir "include" en el query, hacemos que los string sean inclusivos

		const arrayQuery = Object.entries(queryParams)
			.filter(([key]) => paramsInModel.includes(key))
			.map(([key, value]) => {
				// if(value === 'true' || value === 'false')
				try {
					value = JSON.parse(value as string);
				} catch (error) {
					value = value;
				}

				return {
					[key]:
						wantInclude && typeof value === 'string'
							? RegExp(value, 'i')
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
			arrayQuery,
			optionsPaginate,
			modelParamsInQuery,
			objectQuery,
		};
	}
	let returnedObject: ReturnedQuery = {
		model,
		wantInclude,
		queryParams,
		optionsFromQuery,
	};

	// //* Si existen retorno de query del modelo añadimos los valroes opcionales
	if (!!optionalReturn)
		returnedObject = { ...returnedObject, ...(optionalReturn as object) };

	return returnedObject;
};
