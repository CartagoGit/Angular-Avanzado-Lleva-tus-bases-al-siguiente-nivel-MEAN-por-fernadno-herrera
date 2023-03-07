import { Sections } from '../interfaces/paths.interfaces';
import { Path } from '../models/paths/paths.model';

class PathConstants {
	// ANCHOR : Variables

	public static pathsTree = {
		loged: {
			auth: new Path({
				name: 'auth',
				title: 'Authenticacion',
				login: {
					name: 'login',
					title: 'Login',
				},
				register: {
					name: 'register',
					title: 'Register',
				},
				terms: {
					name: 'terms',
					title: 'Terms',
				},
			}),
			maintenance: new Path({
				name: 'maintenance',
				title: 'Maintenance',
			}),
		},
		notLoged: {
			general: new Path({
				name: 'general',
				title: 'General',
				profile: {
					title: 'Profile',
					name: 'profile',
				},
				settings: {
					title: 'Settings',
					name: 'settings',
				},
			}),
			dashboard: new Path({
				name: 'dashboard',
				title: 'Dashboard',
				icon: 'mdi mdi-gauge',
				graphic01: {
					title: 'Graphic 01',
					name: 'graphic01',
				},
				progressBar: {
					title: 'Progress Bar',
					name: 'progressBar',
				},
				rxjs: {
					title: 'Rxjs',
					name: 'rxjs',
				},
				promises: {
					title: 'Promises',
					name: 'promises',
				},
			}),
		},
	};

	// ANCHOR : Constructor
	constructor() {}

	// ANCHOR : Metodos

	/**
	 * ? Funcion para obtener la ruta de una seccion
	 * @param {Sections} section
	 * @param {*} [paths=pathsTree]
	 * @returns {(Path | undefined)}
	 */
	public static getPath = (
		section: Sections,
		paths: any = this.pathsTree
	): Path | undefined => {
		let result: Path | undefined;
		if (!(typeof paths === 'object')) return undefined;
		for (const [key, value] of Object.entries(paths)) {
			if (typeof value !== 'object') continue;
			if (value instanceof Path) {
				if (key === section) return value;
				if (!!value) result = this.getPath(section, value);
				if (!!result) return result;
			} else {
				result = this.getPath(section, value);
				if (!!result) return result;
			}
		}
		return result;
	};
}

//? Constante para exportar las rutas y sus metodos estaticos
export const paths = PathConstants;
