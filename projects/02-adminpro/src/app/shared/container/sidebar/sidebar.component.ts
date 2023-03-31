import { Component } from '@angular/core';
import { paths } from '../../constants/paths.constant';
import { User } from '../../models/mongo-models/user.model';
import { SidebarService } from '../../services/settings/sidebar.service';
import { StateService } from '../../services/settings/state.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [],
})
export class SidebarComponent {
	// ANCHOR : Variables
	public settingsPath = paths.getPath('settings');
	public profilePath = paths.getPath('profile');
	public loginPath = paths.getPath('login');
	public menuItems: any[];
	public user: User;

	// ANCHOR : Constructor
	constructor(
		private _sidebarSvc: SidebarService,
		private _stateSvc: StateService
	) {
		this.menuItems = this._sidebarSvc.menu;
		this.user = this._stateSvc.user!;
	}

	// ANCHOR : Methods


	/**
	 * ? Cierra la sesión
	 * @public
	 */
	public logout(): void {
		this._stateSvc.logout();
	}
}
