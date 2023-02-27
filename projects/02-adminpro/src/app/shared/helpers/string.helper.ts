/**
 * ? Devuelve un texto capitalizado
 * @param {string} text
 * @returns {string}
 */
export const getCapitalize = (text: string): string => {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
