import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../../constants/paths.constant';
import { SidebarService } from '../../services/settings/sidebar.service';
import { StateService } from '../../services/settings/state.service';



@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [],
})
export class SidebarComponent {
	public settingsPath = paths.getPath('settings');
	public loginPath = paths.getPath('login');
	public menuItems: any[];
	constructor(private _sidebarSvc: SidebarService,  private _stateSvc: StateService ) {
		this.menuItems = this._sidebarSvc.menu;
	}

	public logout() : void {
		this._stateSvc.logout();
	}
}
