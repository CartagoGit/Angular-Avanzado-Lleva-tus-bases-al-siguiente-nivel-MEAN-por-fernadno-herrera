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
	optionsPaginate: any;
	model?: Model<any>;
	arrayQuery?: any[];
	objectQuery?: any;
	modelParamsInQuery?: any;
}
