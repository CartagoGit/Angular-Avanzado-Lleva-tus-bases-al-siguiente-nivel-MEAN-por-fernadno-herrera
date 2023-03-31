import { Injectable } from '@angular/core';
import { paths } from '../../constants/paths.constant';

//* Interface de las rutas de los subemus
interface SubmenuRoutes {
	title: string;
	url: string;
}

//* Interface de las rutas del menu principal
interface MenuRoutes {
	title: string;
	icon: string;
	submenu: SubmenuRoutes[];
}

@Injectable({
	providedIn: 'root',
})
export class SidebarService {
	// ANCHOR : Variables
	private _dashboardPath = paths.getPath('dashboard');
	private _progressBarPath = paths.getPath('progressBar');
	private _graphic01Path = paths.getPath('graphic01');
	private _promisesPath = paths.getPath('promises');
	private _rxjsPath = paths.getPath('rxjs');

	public menu: MenuRoutes[] = [
		{
			title: this._dashboardPath?.title!,
			icon: this._dashboardPath?.icon!,
			submenu: [
				{
					title: 'Main',
					url: this._dashboardPath?.fullPath!,
				},
				{
					title: this._progressBarPath?.title!,
					url: this._progressBarPath?.fullPath!,
				},
				{
					title: this._graphic01Path?.title!,
					url: this._graphic01Path?.fullPath!,
				},
				{
					title: this._promisesPath?.title!,
					url: this._promisesPath?.fullPath!,
				},
				{
					title: this._rxjsPath?.title!,
					url: this._rxjsPath?.fullPath!,
				},
			],
		},
	];

	// ANCHOR : Constructor
	constructor() {}
}
