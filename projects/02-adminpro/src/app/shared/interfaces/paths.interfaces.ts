import { Path } from "../models/paths/paths.model";

//$ Secciones de las rutas

//* De autenticacion
export type AuthSections = 'login' | 'register' | 'terms'

//* fuera del login
export type NotLogedSections = 'maintenance' | AuthSections;

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

//* Secicones hijas de las secciones generales
export type ChildrenSections = DashboardSections | GeneralSections;

//* Todas las secciones
export type Sections = ParentSections | ChildrenSections;


/**
 * ? Propiedades del modelo de rutas, donde se debe pasar el tipado de la ruta, y opcionalmente el tipado del padre y de los hijos
 * @export
 * @interface PathProps
 * @typedef {PathProps}
 * @template This
 * @template Children
 * @template Parent
 */
export interface PathProps<
	This extends Sections,
	Children extends Sections | undefined = undefined,
	Parent extends Sections | undefined = undefined
> {
	name: This;
	path: `/${This}`;
	parentName?: Parent;
	parentPath?: `/${Parent}`;
	subsections?: Children extends Sections
		? Record<Children, Path<Children>>
		: undefined;
}
