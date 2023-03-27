
/**
 * ? Interface de la paginacion proveniente del backend
 * @export
 * @interface Pagination
 * @typedef {Pagination}
 */
export interface Pagination {
	hasNextPage: boolean;
	hasPrevPage: boolean;
	limit: number;
	offset: number;
	page: number;
	pagingCounter: number;
	nextPage: number | null;
	prevPage: number | null;
	totalDocs: number;
	totalPages: number;
}
