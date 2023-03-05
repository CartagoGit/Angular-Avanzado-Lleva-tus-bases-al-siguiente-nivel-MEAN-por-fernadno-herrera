import { Path } from '../models/paths/paths.model';

//$ Secciones de las rutas
//* Secciones generales
export type RootSections = 'notLoged' | 'loged';

//* De autenticacion
export type AuthSections = 'login' | 'register' | 'terms';

//* fuera del login
export type NotLogedSections = 'maintenance' | 'auth';

//* Estando logueado
export type LogedSections = 'general' | 'dashboard';

//* Secciones internas hijas
export type GeneralSections = 'settings';

export type DashboardSections =
	| 'main'
	| 'progress-bar'
	| 'graphic'
	| 'promises'
	| 'rxjs';

//* Secciones Padre generales
export type ParentSections = NotLogedSections | LogedSections;

export type ChildrenNotLogedSections = AuthSections;

//* Secicones hijas de las secciones generales
export type ChildrenLogedSections = DashboardSections | GeneralSections;

//* Todas las secciones
export type Sections =
	| ParentSections
	| ChildrenLogedSections
	| ChildrenNotLogedSections
	| RootSections;

/**
 * ? Propiedades del modelo de rutas, donde se debe pasar el tipado de la ruta, y opcionalmente el tipado del padre y de los hijos
 * @export
 * @interface PathProps
 * @typedef {PathProps}
 * @template ThisSection
 * @template Children
 * @template Parent
 */
export type PathProps = {
	name: string;
	parentName?: string;
	parentFullPath?: string;
	children?: PathProps[];
};
