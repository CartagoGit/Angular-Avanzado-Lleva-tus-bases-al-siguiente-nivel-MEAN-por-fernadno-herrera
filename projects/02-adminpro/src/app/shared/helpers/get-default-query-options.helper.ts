import { QueryOptions } from '../services/http/interfaces/request.interface';

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
export const getFillOptions = <Props>(
	options?: QueryOptions<Props>
): QueryOptions<Props> => {
	const defaultOptions = getDefaultQueryOptions<Props>();
	return {
		...defaultOptions,
		...(options || {}),
	};
};
