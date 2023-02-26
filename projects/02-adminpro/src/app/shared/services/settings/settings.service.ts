import { Injectable } from '@angular/core';
import { getUrlTheme } from '../../helpers/get-url-theme';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root',
})
export class SettingsService {
	// ANCHOR : Variables
	private _linkTheme: Element = document.querySelector('#theme')!;
	private _links!: NodeListOf<Element>;
	public set setLinksThemes(links: NodeListOf<Element>) {
		this._links = links;
	}

	// ANCHOR : Constructor
	constructor(private _storageSvc: StorageService) {
		this._setInitTheme();
	}

	// ANCHOR : Metodos
	private _setInitTheme(): void {
		const theme: string = this._storageSvc.local.get('theme') as string;
		this._linkTheme?.setAttribute(
			'href',
			theme || getUrlTheme('default-dark')
		);
	}

	public changeTheme(theme: string): void {
		const urlTheme = getUrlTheme(theme);
		this._linkTheme?.setAttribute('href', urlTheme);
		this._storageSvc.local.set('theme', urlTheme);
		this.checkCurrentTheme();
	}

	public checkCurrentTheme(): string {
		let actualTheme = '';
		this._links.forEach((element) => {
			element.classList.remove('working');
			const btnTheme = element.getAttribute('data-theme')!;
			const btnThemeUrl = getUrlTheme(btnTheme);
			const currentTheme = this._linkTheme?.getAttribute('href');

			if (btnThemeUrl === currentTheme) {
				element.classList.add('working');
				actualTheme = btnTheme;
			}
		});
		return actualTheme;
	}
}
