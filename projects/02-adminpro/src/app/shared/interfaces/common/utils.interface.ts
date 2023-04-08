/**
 * ? Util que muestra el tipado en el editor
 * @export
 * @typedef {Show}
 * @template T
 */
export type Show<T> = { [P in keyof T]: T[P] };

/**
 * ? Util que evita que un objeto pueda ser un array
 * @typedef {NonArrayType}
 * @template T
 */
export type NonArrayType<T> = T extends any[] ? never : T;
