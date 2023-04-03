import { Model } from 'mongoose';

/**
 * ? Interfaz de los parametos u opciones a retornar al realizar un query
 * @export
 * @interface ReturnedQuery
 * @typedef {ReturnedQuery}
 */
export interface ReturnedQuery {
	wantInclude: boolean;
	queryParams: any;
	optionsFromQuery: QueryOptions<any>;
	model?: Model<any>;
	arrayQuery?: any[];
	objectQuery?: any;
	modelParamsInQuery?: any;
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

	//!! Ajenos a mongoose-paginate-v2
	include?: boolean; // Para ser inclusivo con los string de las query -> Ejemplo: ario encuentra Mario
	someQuery?: boolean; // Para hacer una consulta con el operador $or, que valga alguna de las query pasadas

	//* Para mostrar en la respuesta de los logs del backend
	showQuery?: boolean;
	showParams?: boolean;
	showOptions?: boolean;
}

//* Tipado de las opciones de ordenamiento
type SortOptions = 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;
