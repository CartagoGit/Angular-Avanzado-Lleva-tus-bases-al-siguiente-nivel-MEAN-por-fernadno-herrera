/**
 * ? Funcion que retorna la ruta del tema actual o la ruta del tema que se le pase por parametro
 * - Pasandole el nombre del tema retorna la ruta relativa del tema
 * - En caso de no recibir tema, devuelve la ruta del tema actual
 * @param {?string} [theme]
 * @returns {string}
 */
export const getUrlTheme = (theme?: string): string => {
	if (!theme) return document.querySelector('#theme')?.getAttribute('href')!;
	return `./assets/css/colors/${theme}.css`;
};
