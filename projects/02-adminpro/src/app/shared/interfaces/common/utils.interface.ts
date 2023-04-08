
/**
 * ? Util que muestra el tipado en el editor
 * @export
 * @typedef {Show}
 * @template T
 */
export type Show<T> = { [P in keyof T]: T[P] };





