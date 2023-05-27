/**
 * ? Compara dos variables y retorna true si son iguales, incluso objetos profundamente
 * @param {*} x
 * @param {*} y
 * @returns {boolean}
 */
export const isEqual = (x: any, y: any): boolean => {
	if (x === undefined || y === undefined || x === null || y === null)
		return y !== x;

	const type = typeof x;
	const areSameType: boolean = type === typeof y;
	if (!areSameType) return false;
	if (type !== 'object') return x === y;
	if (Array.isArray(x) && Array.isArray(y)) {
		if (x.length !== y.length) return false;
		return [...x].sort().every((xItem, index) => {
			const yItem = [...y].sort()[index];
			return isEqual(xItem, yItem);
		});
	}

	const objectKeys = Object.keys;
	return (
		objectKeys(x).length === objectKeys(y).length &&
		objectKeys(x).every((key) => isEqual(x[key], y[key]))
	);
};


/**
 * ? Recyoera el valor de la propiedad aniadida en un objeto pasandole el objeto y un string
 * @param {*} obj
 * @param {string} path
 * @returns {*}
 */
export const  getPropertyByString = (obj: any, path: string) : any => {
	return path.split(".").reduce((acc, part) => acc && acc[part], obj);
 }
