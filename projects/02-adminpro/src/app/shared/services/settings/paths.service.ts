import { Injectable } from '@angular/core';
import {
	RootSections,
	NotLogedSections,
	LogedSections,
} from '../../interfaces/paths.interfaces';
import { Path } from '../../models/paths/paths.model';
import {
	GeneralSections,
	DashboardSections,
} from '../../interfaces/paths.interfaces';
import { ParentSections } from '../../interfaces/paths.interfaces';

// @Injectable({
// 	providedIn: 'root',
// })
// export class RoutesPath
// 	implements Record<RootSections, Path<ParentSections, ChildrenSections>>
// {
// 	public notLoged!: Path<NotLogedSections>;

// 	public loged = new Path<LogedSections, ChildrenSections>({
// 		name: 'dashboard',
// 		subsections: {
// 			graphic: new Path<DashboardSections>({
// 				name: 'graphic',
// 			}),
// 			general: new Path<GeneralSections>({}),
// 		},
// 	});

// 	static routes: Record<Sections, Path<ParentSections>> = {};
// 	constructor() {
// 		this.notLoged = new Path({ name: 'notLoged', subsections: {} });
// 	}
// }
