import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../../../shared/constants/paths.constant';

@Component({
	selector: 'app-nopagefound',
	templateUrl: './nopagefound.component.html',
	styleUrls: ['./nopagefound.component.css'],
})
export class NoPageFoundComponent {
	public actualYear = new Date().getFullYear();

	private _dashboardPath = paths.getPath('dashboard');

	constructor(private _router: Router) {}

	public goRoute(): void {
		this._router.navigate([this._dashboardPath?.fullPath]);
	}
}
