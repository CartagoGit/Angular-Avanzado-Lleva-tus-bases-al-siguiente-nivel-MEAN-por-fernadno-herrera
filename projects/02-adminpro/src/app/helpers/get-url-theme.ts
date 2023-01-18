/**
 * ? Pasandole el nombre del tema retorna la ruta relativa del tema
 */
export const getUrlTheme = (theme: string): string => {
  return `./assets/css/colors/${theme}.css`;
};
