/**
 * ? Recibiendo un objeto, sirve para mapear su key y su value
 * * Recibe un objeto keyValue y el callback del mapeo a realizar
 * * El callbak de mapeo manda el valor, la key, el index y el array resultante  al realizar el mapeo
 *
 * * El callback puede devolver un objeto keyValue o cualquier otro valor
 * * Si el callback devuelve un keyValue, lo mapea
 * * Si el callback devuelve cualquier otro valor, devuelve la misma key con el valor mapeado
 * @param {Record<string, any>} obj
 * @param {(
		value: any,
		key?: string,
		index?: number,
		array?: [string, any][]
	) => Record<string, any>} mapFunction
 * @returns {Record<string, any>}
 */

export const objectMap = <KeyEntrie extends string, ValueEntrie, MapResult>(
	obj: { [key in KeyEntrie]: ValueEntrie },
	mapCallback: (
		value: ValueEntrie,
		key?: KeyEntrie,
		index?: number,
		array?: [KeyEntrie, ValueEntrie][]
	) => MapResult,
	
): { [key in KeyEntrie]: MapResult } => {
	//* Convertimos los valores de los objetos en sus valores por entrada
	const entries = Object.entries(obj) as [KeyEntrie, ValueEntrie][];

	//* Mapeamos las entradas segun el resultado del callback
	const mappedEntries = entries.map(([key, value], index, array) => {
		const mapResult = mapCallback(value, key, index, array);
		return [key, mapResult];
	}) as Array<[KeyEntrie, MapResult]>;

	const output = Object.fromEntries(mappedEntries) as {
		[key in KeyEntrie]: MapResult;
	};
	return output;
};



