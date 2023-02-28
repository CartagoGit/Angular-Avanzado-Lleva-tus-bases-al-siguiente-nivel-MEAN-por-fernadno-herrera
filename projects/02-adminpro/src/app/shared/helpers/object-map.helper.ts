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
export const objectMap = (
	obj: Record<string, any>,
	mapFunction: (
		value: any,
		key?: string,
		index?: number,
		array?: [string, any][]
	) => Record<string, any> | any
): Record<string, any> => {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value], index, array) => {
			const result = mapFunction(value, key, index, array[index]);
			const [keyResult, valueResult] =
				typeof result === 'object' && !Array.isArray(result)
					? Object.entries(result)[0]
					: [key, result];
			return [keyResult, valueResult];
		})
	);
};
