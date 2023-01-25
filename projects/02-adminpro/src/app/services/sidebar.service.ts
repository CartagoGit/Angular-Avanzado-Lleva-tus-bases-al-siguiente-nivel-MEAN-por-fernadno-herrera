import { Injectable } from '@angular/core';

interface SubmenuRoutes {
	title: string;
	url: string;
}

interface MenuRoutes {
	title: string;
	icon: string;
	submenu: SubmenuRoutes[];
}

@Injectable({
	providedIn: 'root',
})
export class SidebarService {
	public menu: MenuRoutes[] = [
		{
			title: 'Dashboard',
			icon: 'mdi mdi-gauge',
			submenu: [
				{
					title: 'Main',
					url: './',
				},
				{
					title: 'ProgressBar',
					url: './progress',
				},
				{
					title: 'Graphic',
					url: './graphic01',
				},
				{
					title: 'Promises',
					url: './promises',
				},
				{
					title: 'Rxjs',
					url: './rxjs',
				},
			],
		},
	];

	constructor() {}
}
