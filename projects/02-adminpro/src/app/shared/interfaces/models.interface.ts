//* Array con los posibles modelos de la base de datos
export const modelMongo = ['user', 'hospital', 'doctor'] as const;

//* Tipado de los modelos de la base de datos
export type ModelMongo = (typeof modelMongo)[number];

//* Array con los posibles modelos de la base de datos en plural
export const modelsMongo: `${ModelMongo}s`[] = modelMongo.map(
	(model) => `${model}s` as `${ModelMongo}s`
);

//* Tipado de los modelos de la base de datos en plural
export type ModelsMongo = (typeof modelsMongo)[number];

//* Array con posibles tipos de archivos de la BD
export const typeFile = [
	'image',
	'text',
	'pdf',
	'video',
	'audio',
	'icon',
] as const;

//* Tipado de los posibles archivos desde el back
export type TypeFile = (typeof typeFile)[number];

//* Array de los posibles archivos desde el back en plural
export const typesFiles = typeFile.map((type) => `${type}s` as `${TypeFile}s`);

//* Tipado de los posibles archivos desde el back en plural
export type TypesFiles = (typeof typesFiles)[number];
