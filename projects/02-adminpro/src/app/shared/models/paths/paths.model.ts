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

type IPath = Path & { [key in Sections]?: Path };

export class Path implements IPath {
// export class Path {
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

	constructor(data: PathProps) {
		const { name, parentName, parentFullPath, children = [] } = data;
		this.name = name;
		this.parentName = parentName;
		this.parentFullPath = parentFullPath;

		this._createChildren(children);
	}

	// ANCHOR : Methods

	/**
	 * ? Crea las rutas hijas
	 * @private
	 * @param {PathProps[]} children
	 */
	private _createChildren(children: PathProps[]) {
		for (const child of children) {

			console.log('child', child);
			if (!!child.children) {
				// FIXME Si el hijo tiene mas hijos, estos se crean en el padre tambien
				this._createChildren(child.children);
			}
			const propValue = new Path({
				...child,
				parentName: this.name,
				parentFullPath: this.fullPath,
			}); // Crear nueva instancia de Path
			// FIXME Las propiedades no salen en el inteliseasne pero si por consola
			Object.defineProperty(this, child.name, {
				value: propValue,
				// configurable: true,
				enumerable: true,
				writable: false,
			});

			console.log(this);
		}
	}
}

export const paths = {
	loged: {
		auth: new Path({
			name: 'auth',
			children: [
				{
					name: 'login',
					children: [
						{
							name: 'unHijoDeLogin',
						},
						{
							name: 'otroHijoDeLogin',
						},
					],
				},
				{
					name: 'register',
				},
				{
					name: 'terms',
				},
			],
		}),
		maintenance: new Path({
			name: 'maintenance',
		}),
	},
	notLoged: {
		general: new Path({
			name: 'general',
			children: [
				{
					name: 'profile',
				},
				{
					name: 'settings',
				},
			],
		}),
		dashboard: new Path({
			name: 'dashboard',
			children: [
				{
					name: 'graphic',
				},
				{
					name: 'progressBar',
				},
				{
					name: 'rxjs',
				},
				{
					name: 'promises',
				},
			],
		}),
	},
};
