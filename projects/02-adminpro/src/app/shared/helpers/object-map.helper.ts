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
export const objectMap_ = <
	KeyEntrie extends string,
	ValueEntrie,
	MapResult extends any,
	KeyResult extends string,
	ValueResult
>(
	obj: Record<KeyEntrie, ValueEntrie>,
	mapFunction: (
		value: ValueEntrie,
		key?: KeyEntrie,
		index?: number,
		array?: [KeyEntrie, ValueEntrie][]
	) => MapResult extends ValueResult
		? ValueResult
		: Record<KeyResult, ValueResult>
	// ) => { [k in KeyResult]: ValueResult } | ValueResult
	// ) => MapResult | ValueResult
	// ): Record<KeyResult | KeyEntrie, ValueResult> => {
): Record<KeyResult, ValueResult> => {
	return Object.fromEntries<ValueResult>(
		Object.entries<ValueEntrie>(obj).map(([key, value], index, array) => {
			const result = mapFunction(
				value,
				key as KeyEntrie,
				index,
				array as [KeyEntrie, ValueEntrie][]
			);

			const [keyResult, valueResult] =
				typeof result === 'object' && !Array.isArray(result) && !!result
					? (Object.entries(
							result as Record<KeyResult, ValueResult>
					  )[0] as [KeyResult, ValueResult])
					: ([key, result] as [keyof typeof obj, MapResult]);
			return [keyResult, valueResult];
		}) as [KeyResult, ValueResult][]
	) as Record<KeyResult, ValueResult>;
};

export const objectMap = <
	KeyEntrie extends string,
	ValueEntrie,
	KeyResult extends string,
	ObjectValueResult,
	ValueResult extends any
>(
	obj: Record<KeyEntrie, ValueEntrie>,
	mapCallback: (
		value: ValueEntrie,
		key?: KeyEntrie,
		index?: number,
		array?: [KeyEntrie, ValueEntrie][]
		// ) => MapResult extends Record<KeyResult, ValueResult>
		// 	? Record<KeyResult, ValueResult>
		// 	: ValueResult
		// ) => Record<KeyResult, ValueResult> | ValueResult
		// ) => ObjectValueResult extends { [k in KeyResult]: ValueResult }
		// 	? { [k in KeyResult]: ValueResult }
		// 	: ObjectValueResult
	) => ObjectValueResult extends Record<KeyResult, ValueResult>
		? Record<KeyResult, ValueResult>
		: ObjectValueResult
): Record<KeyResult | KeyEntrie, ValueResult> => {
	//* Convertimos los valores de los objetos en sus valores por entrada
	const entries = Object.entries(obj) as [KeyEntrie, ValueEntrie][];

	//* Mapeamos las entradas segun el resultado del callback
	const mappedEntries = entries.map(([key, value], index, array) => {
		const cbResult = mapCallback(value, key, index, array);

		let keyResult!: KeyResult | KeyEntrie;
		let valueResult!: ValueResult | ObjectValueResult;
		if (
			typeof cbResult === 'object' &&
			!Array.isArray(cbResult) &&
			!!cbResult
		) {
			const cbObjResult = cbResult as Record<KeyResult, ValueResult>;
			const cbKeys = Object.keys(cbObjResult);

			cbKeys.forEach((key) => {
				keyResult = key as KeyResult;
				valueResult = cbObjResult[keyResult];
			});
		} else {
			keyResult = key as string as KeyEntrie;
			valueResult = cbResult as ObjectValueResult;
		}

		// const result =
		// 	typeof cbResult === 'object' && !Array.isArray(cbResult) && !!cbResult
		// 		? (Object.entries(cbResult)[0] as [KeyResult, ValueResult])
		// 		: ([key, cbResult] as [KeyResult, any]);
		return [keyResult, valueResult] as [KeyResult | KeyEntrie, ValueResult];
	});

	const output = Object.fromEntries(mappedEntries) as Record<
		KeyResult | KeyEntrie,
		ValueResult
	>;

	return output;
};

// type MapFunction<T> = (input: T) => T;

// function mapObject<T extends object, U extends object>(
// 	input: T,
// 	mapFn: MapFunction<T>
// ): U {
// 	const entries = Object.entries(input);
// 	const mappedEntries = entries.map(([key, value]) => [
// 		key,
// 		mapFn(value),
// 	]) as Array<[keyof U, U[keyof U]]>;
// 	const output = Object.fromEntries(mappedEntries) as U;
// 	return output;
// }
