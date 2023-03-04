import { objectMap } from '../../helpers/object-map.helper';
import {
	Sections,
	// PathProps,
	AuthSections,
	NotLogedSections,
} from '../../interfaces/paths.interfaces';

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
// export class Path<
// 	ThisSection extends Sections,
// 	Children extends Sections | undefined = undefined,
// 	Parent extends Sections | undefined = undefined
// > implements PathProps<ThisSection, Children, Parent>
// {
// 	public name: ThisSection;
// 	public get path(): `/${ThisSection}` {
// 		return `/${this.name}`;
// 	}

// 	public parentName?: Parent;
// 	public get parentPath(): `/${Parent}` | undefined {
// 		return this.parentName ? `/${this.parentName}` : undefined;
// 	}

// 	public subsections?: Children extends Sections
// 		? Record<Children, Path<Children>>
// 		: undefined;

// 	constructor(data: PathProps<ThisSection, Children, Parent>) {
// 		const { name, parentName, subsections } = data;
// 		this.name = name;
// 		this.parentName = parentName;
// 		this.subsections = subsections
// 			? objectMap(
// 					subsections,
// 					(value: PathProps<any>) => new Path<any>(value)
// 			  )
// 			: undefined;
// 	}
// }

// const paths = {
// 	loged: {
// 		auth: new Path<NotLogedSections, AuthSections>({
// 			name: 'auth',
// 			subsections: {
// 				login: {
// 					name: 'login',
// 				},
// 				register: {
// 					name: 'register',
// 				},
// 				terms: {
// 					name: 'terms',
// 				},
// 			},
// 		}),
// 		maintenance: {
// 			name: 'maintenance',
// 		},
// 	},
// 	notLoged: {
// 		general: {
// 			name: 'general',
// 			subsections: {
// 				profile: {
// 					name: 'profile',
// 				},
// 				settings: {
// 					name: 'settings',
// 				},
// 			},
// 		},
// 		dashboard: {
// 			name: 'dashboard',
// 			subsections: {
// 				graphic: {
// 					name: 'graphic',
// 				},
// 				progressBar: {
// 					name: 'progressBar',
// 				},
// 				rxjs: {
// 					name: 'rxjs',
// 				},
// 				promises: {
// 					name: 'promises',
// 				},
// 			},
// 		},
// 	},
// };

// const prueba = new Path(paths.loged.auth)
