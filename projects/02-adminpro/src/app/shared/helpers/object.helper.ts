/**
 * ? Compara dos variables y retorna true si son iguales, incluso objetos profundamente
 * @param {*} x
 * @param {*} y
 * @returns {boolean}
 */
export const isEqual = (x: any, y: any): boolean => {
	if (x === undefined || y === undefined || x === null || y === null) {
		if (y !== x) return false;
		else return true;
	}
	const type = typeof x;
	const areSameType: boolean = type === typeof y;
	if (!areSameType) return false;
	if (type !== 'object') return x === y;

	const objectKeys = Object.keys;
	return (
		objectKeys(x).length === objectKeys(y).length &&
		objectKeys(x).every((key) => isEqual(x[key], y[key]))
	);
};
