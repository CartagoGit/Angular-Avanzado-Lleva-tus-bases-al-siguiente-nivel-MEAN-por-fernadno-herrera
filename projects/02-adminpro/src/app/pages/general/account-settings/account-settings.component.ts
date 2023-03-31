import { Component } from '@angular/core';
import { SettingsService } from '../../../shared/services/settings/settings.service';

@Component({
	selector: 'app-account-settings',
	templateUrl: './account-settings.component.html',
	styles: [
		`
			.selector {
				cursor: pointer;
				color: #fff !important;
				font-weight: 600;
				padding-right: 4px;

				text-align: right;
			}
			.selector:before {
				top: unset !important;
				left: unset !important;
				line-height: 75px !important;
				right: 4px;
				text-align: right !important;
			}
		`,
	],
})
export class AccountSettingsComponent {
	// ANCHOR : Variables
	private _links!: NodeListOf<Element>;

	// ANCHOR: Constructor
	constructor(private _settingsSvc: SettingsService) {}

	ngOnInit(): void {
		this._links = document.querySelectorAll('.selector');
		this._settingsSvc.setLinksThemes = this._links;
		this._settingsSvc.checkCurrentTheme();
	}

	// ANCHOR : Métodos


	/**
	 * ? Cambia el tema de la aplicación
	 * @public
	 * @param {string} theme
	 */
	public changeTheme(theme: string) {
		this._settingsSvc.changeTheme(theme);
	}
}
