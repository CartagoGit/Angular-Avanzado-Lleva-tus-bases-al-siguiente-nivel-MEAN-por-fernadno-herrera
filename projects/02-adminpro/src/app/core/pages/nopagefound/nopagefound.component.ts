import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../../../shared/constants/paths.constant';

@Component({
	selector: 'global-nopagefound',
	templateUrl: './nopagefound.component.html',
	styleUrls: ['./nopagefound.component.css'],
})
export class NoPageFoundComponent {
	// ANCHOR - Variables
	public actualYear = new Date().getFullYear();

	private _dashboardPath = paths.getPath('dashboard');

	// ANCHOR - Constructor
	constructor(private _router: Router) {}

	// ANCHOR - Methods


	/**
	 * ? Navega a la ruta especificada, en este caso a la ruta del dashboard
	 * @public
	 */
	public goRoute(): void {
		this._router.navigate([this._dashboardPath?.fullPath]);
	}
}
