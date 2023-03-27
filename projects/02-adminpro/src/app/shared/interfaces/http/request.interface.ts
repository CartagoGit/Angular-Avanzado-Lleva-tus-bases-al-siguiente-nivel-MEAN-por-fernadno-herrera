/**
 * ? Respuesta default para el body de peticiones al Auth
 * @export
 * @interface UserDefaultResponse
 * @typedef {UserDefaultResponse}
 */
export interface AuthDefaultResponse {
	name?: string;
	password?: string;
	email?: string;
	token?: string;
}

/**
 * ? Opciones para realizar una consulta a la base de datos con el plugin mongoose-paginate-v2
 * @export
 * @interface QueryOptions
 * @typedef {QueryOptions}
 * @template Props
 */
export interface QueryOptions<Props> {
	select?: Partial<keyof Props> | Partial<keyof Props[]>;
	sort?: Record<Partial<keyof Props>, SortOptions>; // { field: 'asc', test: -1, otherField : desc } // asc, desc, ascending, descending, 1, and -1
	populate?:
		| Partial<keyof Props>
		| Partial<keyof Props[]>
		| {
				path: keyof Props;
				select?: keyof Props | keyof Props[];
				match?: RegExp;
				sort?: Record<string, SortOptions>;
		  };
	limit?: number;
	page?: number;
	offset?: number; // Use offset or page to set skip position
	pagination?: boolean;
	include?: boolean;
}

//* Tipado de las opciones de ordenamiento
type SortOptions = 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;
