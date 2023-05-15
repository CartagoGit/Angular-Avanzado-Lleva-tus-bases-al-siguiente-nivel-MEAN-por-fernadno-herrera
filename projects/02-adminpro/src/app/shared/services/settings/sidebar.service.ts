import { Injectable } from '@angular/core';
import { paths } from '../../constants/paths.constant';

//* Interface de las rutas de los subemus
export interface SubmenuRoutes {
	title: string;
	url: string;
	needAdmin?: boolean;
}

//* Interface de las rutas del menu principal
export interface MenuRoutes {
	title: string;
	icon: string;
	needAdmin?: boolean;
	submenu: SubmenuRoutes[];
}

@Injectable({
	providedIn: 'root',
})
export class SidebarService {
	// ANCHOR : Variables

	//* Dashboard
	private _dashboardPath = paths.getPath('dashboard');
	private _progressBarPath = paths.getPath('progressBar');
	private _graphic01Path = paths.getPath('graphic01');
	private _promisesPath = paths.getPath('promises');
	private _rxjsPath = paths.getPath('rxjs');
	private _standalonePath = paths.getPath('standalone');

	//* Support
	private _supportPath = paths.getPath('support');
	private _usersPath = paths.getPath('users');
	private _hospitalsPath = paths.getPath('hospitals');
	private _doctorsPath = paths.getPath('doctors');

	public menu: MenuRoutes[] = [
		{
			title: this._dashboardPath?.title!,
			icon: this._dashboardPath?.icon!,
			needAdmin: false,
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
				{
					title: this._standalonePath?.title!,
					url: this._standalonePath?.fullPath!,
				},
			],
		},
		{
			title: this._supportPath?.title!,
			icon: this._supportPath?.icon!,
			needAdmin: true,
			submenu: [
				{
					title: 'Users',
					url: this._usersPath?.fullPath!,
				},
				{
					title: 'Doctors',
					url: this._doctorsPath?.fullPath!,
				},
				{
					title: 'Hospitals',
					url: this._hospitalsPath?.fullPath!,
				},
			],
		},
	];

	// ANCHOR : Constructor
	constructor() {}
}
