export type NotLogedSections = 'maintenance' | 'login' | 'register' | 'terms';

export type LogedSections = 'general' | 'dashboard';

export type GeneralSections = 'settings';

export type DashboardSections =
	| 'main'
	| 'progress-bar'
	| 'graphic'
	| 'promises'
	| 'rxjs';

export type ParentSections = NotLogedSections | LogedSections;

export type ChildrenSections = DashboardSections | GeneralSections

export type Sections = ParentSections | ChildrenSections;

export class Path<T extends Sections, K extends ChildrenSections | undefined = undefined> {
	public name : T;
	get path () :`/${typeof this.name}`{
		return `/${this.name}`
	}

	constructor (data: {
		name: T
	}){

		const {name}= data;
		this.name = name;

	}

}
