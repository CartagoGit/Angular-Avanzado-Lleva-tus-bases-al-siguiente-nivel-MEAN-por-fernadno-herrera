import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../../constants/paths.constant';
import { StorageService } from '../../services/settings/storage.service';
import { StateService } from '../../services/settings/state.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [],
})
export class HeaderComponent {
	public settingsPath = paths.getPath('settings');

	private _loginPath = paths.getPath('login');

	constructor(private _stateSvc: StateService) {}

	public logout(): void {
		this._stateSvc.logout();
	}
}
