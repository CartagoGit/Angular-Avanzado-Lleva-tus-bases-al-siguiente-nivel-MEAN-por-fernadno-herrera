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
		const { name, parentName, parentFullPath, ...children } = data;
		this.name = name;
		this.parentName = parentName;
		this.parentFullPath = parentFullPath;

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

export const pathsTree = {
	loged: {
		auth: new Path({
			name: 'auth',
			login: {
				name: 'login',

				maintenance: {
					name: 'unHijoDeLogin',
				},
				dashboard: {
					name: 'otroHijoDeLogin',
				},
			},
			register: {
				name: 'register',
			},
			terms: {
				name: 'terms',
			},
		}),
		maintenance: new Path({
			name: 'maintenance',
		}),
	},
	notLoged: {
		general: new Path({
			name: 'general',
			profile: {
				name: 'profile',
			},
			settings: {
				name: 'settings',
			},
		}),
		dashboard: new Path({
			name: 'dashboard',
			graphic: {
				name: 'graphic',
			},
			progressBar: {
				name: 'progressBar',
			},
			rxjs: {
				name: 'rxjs',
			},
			promises: {
				name: 'promises',
			},
		}),
	},
};


/**
 * ? Funcion para obtener la ruta de una seccion
 * @param {Sections} section
 * @param {*} [paths=pathsTree]
 * @returns {(Path | undefined)}
 */
export const getPath = (
	section: Sections,
	paths: any = pathsTree
): Path | undefined => {
	let result: Path | undefined;
	if (!(typeof paths === 'object')) return undefined;
	for (const [key, value] of Object.entries(paths)) {
		if (typeof value !== 'object') continue;
		if (value instanceof Path) {
			if (key === section) return value;
			if (!!value) result = getPath(section, value);
			if (!!result) return result;
		} else {
			result = getPath(section, value);
			if (!!result) return result;
		}
	}
	return result;
};
