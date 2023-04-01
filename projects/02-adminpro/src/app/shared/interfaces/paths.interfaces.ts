//$ Secciones de las rutas
//* Secciones generales
export type RootSections = 'notLoged' | 'loged';

//* De autenticacion
export type AuthSections = 'login' | 'register' | 'terms';

//* fuera del login
export type NotLogedSections = 'maintenance' | 'auth' | 'no-page-found';

//* Estando logueado
export type LogedSections = 'general' | 'dashboard' | 'support';

//* Secciones internas hijas
export type GeneralSections = 'settings' | 'profile';

export type DashboardSections =
	| 'main'
	| 'progressBar'
	| 'graphic01'
	| 'promises'
	| 'rxjs';

export type SupportSections = 'users' | 'hospitals' | 'doctors';

//* Secciones Padre generales
export type ParentSections = NotLogedSections | LogedSections;

export type ChildrenNotLogedSections = AuthSections;

//* Secicones hijas de las secciones generales
export type ChildrenLogedSections =
	| DashboardSections
	| GeneralSections
	| SupportSections;

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
	title?: string;
	icon?: string;
} & { [key in Sections]?: PathProps };
