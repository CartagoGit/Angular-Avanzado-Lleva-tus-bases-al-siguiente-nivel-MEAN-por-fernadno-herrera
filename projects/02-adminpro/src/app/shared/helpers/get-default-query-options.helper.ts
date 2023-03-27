import { QueryOptions } from '../services/http/interfaces/request.interface';

/**
 * ? Recupera las opciones por defecto para la paginacion de las consultas
 * @type {Readonly<Partial<QueryOptions<any>>>}
 */
export const getDefaultQueryOptions: Readonly<Partial<QueryOptions<any>>> = {
	include: true,
	limit: 20,
	offset: 0,
	page: 1,
	pagination: true,
};
