import { PathProps, Sections } from '../../interfaces/paths.interfaces';

/**
 * ? Clase para crear las rutas
 * * Debe recibir el tipo de ruta que es
 * * Opcionalmente puede recibir el tipo de ruta del padre y de las rutas hijas
 * @export
 * @class Path
 * @typedef {Path}
 * @template ThisSection
 * @template Children
 * @template Parent
 * @implements {PathProps<ThisSection, Children, Parent>}
 */

export class Path {
	// ANCHOR : Variables

	public readonly title?: string;

	public readonly name: string;
	public get path(): string {
		return `/${this.name}`;
	}

	public readonly parentName?: string;
	public get parentPath(): string | undefined {
		return this.parentName ? `/${this.parentName}` : undefined;
	}

	public readonly parentFullPath?: string;
	public get fullPath(): string {
		return this.parentFullPath ? this.parentFullPath + this.path : this.path;
	}

	public everyPath: string[];

	constructor(data: PathProps) {
		const { name, parentName, parentFullPath, title, ...children } = data;
		this.name = name;
		this.parentName = parentName;
		this.parentFullPath = parentFullPath;
		this.title = title;

		this.everyPath = this.fullPath
			.split('/')
			.filter((path) => !!path)
			.map((path) => path.toLowerCase());

		for (const [key, child] of Object.entries(children)) {
			//* Crea nueva instancia de Path por cada hijo
			const propValue = new Path({
				...child,
				parentName: this.name,
				parentFullPath: this.fullPath,
			});
			// REVIEW Las propiedades no salen en el inteliseasne pero si por consola - No se ha encontrado solucion a inferir el tipo de las propiedades
			Object.defineProperty(this, child.name, {
				value: propValue,
				configurable: false,
				enumerable: true,
				writable: false,
			});
		}
	}

	// ANCHOR : Methods
}
