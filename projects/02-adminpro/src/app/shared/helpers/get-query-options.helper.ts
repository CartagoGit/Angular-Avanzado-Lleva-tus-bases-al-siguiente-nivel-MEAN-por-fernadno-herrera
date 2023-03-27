import { QueryOptions } from "../interfaces/http/request.interface";

/**
 * ? Recupera parametros por defecto para la paginacion de las consultas
 * @template Props
 * @returns {QueryOptions<Props>}
 */
export const getDefaultQueryOptions = <Props>(): QueryOptions<Props> => {
	const defaultQueryOptions: Readonly<QueryOptions<Props>> = {
		include: true,
		limit: 20,
		offset: 0,
		page: 1,
		pagination: true,
	};
	return defaultQueryOptions;
};

/**
 * ? Recupera los parametros de paginacion de las consultas
 * @template Props
 * @param {?QueryOptions<Props>} [options]
 * @returns {QueryOptions<Props>}
 */
export const getQueryOptions = <Props>(
	options?: QueryOptions<Props>,
	useDefaultOptions = true
): QueryOptions<Props> => {
	const defaultOptions = useDefaultOptions
		? getDefaultQueryOptions<Props>()
		: {};
	return {
		...defaultOptions,
		...(options || {}),
	};
};


/**
 * ? Recupera los parametros de paginacion de las consultas parseadas
 * @template Props
 * @param {?QueryOptions<Props>} [options]
 * @param {boolean} [useDefaultOptions=true]
 * @returns {(string | undefined)}
 */
export const getOptionsParsed = <Props>(
	options?: QueryOptions<Props>,
	useDefaultOptions: boolean = true
): string | undefined => {
	options = getQueryOptions(options, useDefaultOptions);

	const optionsParsed = options ? JSON.stringify(options) : undefined;
	return optionsParsed;
};


/**
 * ? Recupera los parametros de consulta y paginacion de las consultas
 * @template Props
 * @param {?Partial<Props>} [query]
 * @param {?QueryOptions<Props>} [options]
 * @param {boolean} [useDefaultOptions=true]
 * @returns {(Record<string,string> & { options?: string })}
 */
export const getParamsWithOptions = <Props>(
	query?: Partial<Props>,
	options?: QueryOptions<Props>,
	useDefaultOptions: boolean = true
): Record<string,string> & { options?: string } => {
	query = query || {};
	const optionsParsed = getOptionsParsed(options, useDefaultOptions);
	let params = {
		...query,
	} as { [key: string]: string } & { options?: string };
	if (optionsParsed) params.options = optionsParsed;
	return params;
};
