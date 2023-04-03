/**
 * ? Respuesta default para el body de peticiones al Auth
 * @export
 * @interface AuthDefaultRequest
 * @typedef {AuthDefaultRequest}
 */
export interface AuthDefaultRequest {
	name?: string;
	password?: string;
	email?: string;
	token?: string;
}

//* Interfaz para los parametros de los modelos con el token obligatorio
export type ModelToken = Required<Pick<AuthDefaultRequest, 'token'>>;

//* Tipo de los token de los modelos
export type TypeToken<Model extends AuthDefaultRequest = AuthDefaultRequest> =
	Model['token'];


/**
 * ? Datos para la paginacion de las respuestas
 * @export
 * @interface PaginationData
 * @typedef {PaginationData}
 */
export interface PaginationData {
	limit: number;
	page: number;
}

/**
 * ? Opciones para realizar una consulta a la base de datos con el plugin mongoose-paginate-v2
 * @export
 * @interface QueryOptions
 * @typedef {QueryOptions}
 * @template Props
 */
export type QueryOptions<Props> = Partial<PaginationData> & {
	select?: Partial<keyof Props> | Partial<keyof Props[]>;
	sort?: Record<Partial<keyof Props>, SortOptions>; // { field: 'asc', test: -1, otherField : desc } // asc, desc, ascending, descending, 1, and -1
	populate?: // Para hacer populate de los campos deseados
		| Partial<keyof Props>
		| Partial<keyof Props[]>
		| {
				path: keyof Props;
				select?: keyof Props | keyof Props[];
				match?: RegExp;
				sort?: Record<string, SortOptions>;
		  };

	offset?: number; // Use offset or page to set skip position
	pagination?: boolean; // por defecto es true, si no se desea paginacion pasar en false

	//!! Ajenos a mongoose-paginate-v2
	include?: boolean; // Para ser inclusivo con los string de las query -> Ejemplo: ario encuentra Mario
	someQuery?: boolean; // Para hacer una consulta con el operador $or, que valga alguna de las query pasadas

	//* Para mostrar en la respuesta de los logs del backend
	showQuery?: boolean;
	showParams?: boolean;
	showOptions?: boolean;

};

//* Tipado de las opciones de ordenamiento
type SortOptions = 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;
