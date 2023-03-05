/**
 * ? Recibiendo un objeto, sirve para mapear su key y su value
 * * Recibe un objeto keyValue y el callback del mapeo a realizar
 * * El callbak de mapeo manda el valor, la key, el index y el array resultante  al realizar el mapeo
 *
 * * El callback devuelve la misma key con el valor mapeado
 * @template KeyEntrie
 * @template ValueEntrie
 * @template MapResult
 * @param {{ [key in KeyEntrie]: ValueEntrie }} obj
 * @param {(
		value: ValueEntrie,
		key?: KeyEntrie,
		index?: number,
		array?: [KeyEntrie, ValueEntrie][]
	) => MapResult} mapCallback
 * @returns {{ [key in KeyEntrie]: MapResult }}
 */
export const objectMap = <KeyEntrie extends string, ValueEntrie, MapResult>(
	obj: { [key in KeyEntrie]: ValueEntrie },
	mapCallback: (
		value: ValueEntrie,
		key?: KeyEntrie,
		index?: number,
		array?: [KeyEntrie, ValueEntrie][]
	) => MapResult
): { [key in KeyEntrie]: MapResult } => {
	//* Convertimos los valores de los objetos en sus valores por entrada
	const entries = Object.entries(obj) as [KeyEntrie, ValueEntrie][];

	//* Mapeamos las entradas segun el resultado del callback
	const mappedEntries = entries.map(([key, value], index, array) => {
		const mapResult = mapCallback(value, key, index, array);

		return [key, mapResult];
	}) as Array<[KeyEntrie, MapResult]>;

	//* Convertirmos el array en un nuevo objeto con los nuevos valores
	const output = Object.fromEntries(mappedEntries) as {
		[key in KeyEntrie]: MapResult;
	};
	return output;
};



/**
 * ? Cambia las keys de un objeto
 * @template KeyEntrie
 * @template ValueEntrie
 * @template MapResult
 * @param {{
		[key in KeyEntrie]: ValueEntrie;
	}} obj
 * @param {(
		key: KeyEntrie,
		value?: ValueEntrie,
		index?: number,
		array?: [KeyEntrie, ValueEntrie][]
	) => MapResult} mapCallback
 * @returns {MapResult) => { ...; }}
 */
export const objectKeyMap = <
	KeyEntrie extends string,
	ValueEntrie,
	MapResult extends string
>(
	obj: {
		[key in KeyEntrie]: ValueEntrie;
	},
	mapCallback: (
		key: KeyEntrie,
		value?: ValueEntrie,
		index?: number,
		array?: [KeyEntrie, ValueEntrie][]
	) => MapResult
) => {
	//* Convertimos los valores de los objetos en sus valores por entrada
	const entries = Object.entries(obj) as [KeyEntrie, ValueEntrie][];

	//* Mapeamos las entradas segun el resultado del callback
	const mappedEntries = entries.map(([key, value], index, array) => {
		const mapResult = mapCallback(key, value, index, array) as MapResult;

		return [mapResult, value];
	}) as Array<[MapResult, ValueEntrie]>;

	const keyFinal : ReadonlyArray<MapResult> = mappedEntries.map(([key, _value]) => key)

	//* Convertirmos el array en un nuevo objeto con los nuevos valores
	const output = Object.fromEntries(mappedEntries) as {[key in typeof keyFinal[number]] : ValueEntrie};
	return output as {[key in typeof keyFinal[number]] : ValueEntrie};
};
