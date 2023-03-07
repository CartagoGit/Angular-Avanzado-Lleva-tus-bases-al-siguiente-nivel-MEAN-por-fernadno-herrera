import { Injectable } from '@angular/core';
import { paths } from '../../constants/paths.constant';

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
	private _dashboardPath = paths.getPath('dashboard');
	private _progressBarPath = paths.getPath('progressBar');
	private _graphic01Path = paths.getPath('graphic01');
	private _promisesPath = paths.getPath('promises');
	private _rxjsPath = paths.getPath('rxjs');
	private _generalPath = paths.getPath('general');
	private _settingsPath = paths.getPath('settings');
	private _profilePath = paths.getPath('profile');

	public menu: MenuRoutes[] = [
		{
			title: this._dashboardPath?.title!,
			icon: 'mdi mdi-gauge',
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

	constructor() {}
}
