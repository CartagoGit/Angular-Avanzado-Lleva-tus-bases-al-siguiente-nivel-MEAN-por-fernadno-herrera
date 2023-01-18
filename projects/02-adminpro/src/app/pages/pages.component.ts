import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions(): void;

@Component({
	selector: 'app-pages',
	templateUrl: './pages.component.html',
	styles: [],
})
export class PagesComponent {
	// ANCHOR : Variables
	public actualYear = new Date().getFullYear();

	// ANCHOR : Constructor
	constructor(private _settingsSvc: SettingsService) {
		this._settingsSvc;
	}

	ngOnInit(): void {
		customInitFunctions();
	}
}
