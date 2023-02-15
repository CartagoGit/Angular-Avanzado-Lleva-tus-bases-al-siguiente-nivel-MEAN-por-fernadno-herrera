
//* Tipos de archivos
export const typesFile = ['image', 'text', 'pdf', 'video', 'audio', 'icon'];
//* Tipado de los posibles archivos
export type TypesFile = (typeof typesFile)[number];

/**
 * ? Comprueba si un tipo de ruta es de archivo
 * @param {TypesFile} typeFile
 * @returns {typeFile is TypesFile}
 */
export const isValidTypeFile = (typeFile: TypesFile): typeFile is TypesFile =>
	typesFile
		.map((typeFileSingular) => typeFileSingular + 's')
		.includes(typeFile);
