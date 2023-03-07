import { Component } from '@angular/core';
import { paths } from '../../constants/paths.constant';
import { SidebarService } from '../../services/settings/sidebar.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [],
})
export class SidebarComponent {
	public settingsPath = paths.getPath('settings');
	public loginPath = paths.getPath('login');
	public menuItems: any[];
	constructor(private _sidebarSvc: SidebarService) {
		this.menuItems = this._sidebarSvc.menu;
	}
}
