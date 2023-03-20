import { Component } from '@angular/core';
import { paths } from '../../constants/paths.constant';
import { StateService } from '../../services/settings/state.service';
import { User } from '../../models/mongo-models/user.model';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [
		`
			.role {
				color: #fff;
			}
		`,
	],
})
export class HeaderComponent {
	public settingsPath = paths.getPath('settings');
	public profilePath = paths.getPath('profile');
	public user: User;

	constructor(private _stateSvc: StateService) {
		this.user = this._stateSvc.user!;
	}

	public logout(): void {
		this._stateSvc.logout();
	}
}
