/**
 * ? Valores a enviar en la request del body al añadir datos en parametros que sean Arrays
 * @export
 * @interface requestModifierArrays
 * @typedef {requestModifierArrays}
 */
export type RequestFieldModifierArrays = {
	[field in string]: {
		values: any[];
		options?: {
			is_unique: boolean;
		};
	};
};

/**
 * ? Interfaz de valores a añadir en los arrays de los modelos
 * @export
 * @interface fieldValues
 * @typedef {fieldValues}
 */
export type RequestFieldValues = {
	[field in string]: any[];
};
