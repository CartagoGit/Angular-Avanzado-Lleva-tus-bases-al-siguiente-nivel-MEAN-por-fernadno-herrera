import { Component, ElementRef, ViewChild } from '@angular/core';
import { paths } from '../../constants/paths.constant';
import { StateService } from '../../services/settings/state.service';
import { User } from '../../models/mongo-models/user.model';
import { debounceTime, fromEvent } from 'rxjs';

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
	// ANCHOR : Variables
	@ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>;

	public settingsPath = paths.getPath('settings');
	public profilePath = paths.getPath('profile');
	public user: User;
	private _lastSearch: string = '';

	// ANCHOR : Constructor
	constructor(private _stateSvc: StateService) {
		this.user = this._stateSvc.user!;
	}

	ngAfterViewInit(): void {
		fromEvent(this.inputSearch.nativeElement, 'input')
			.pipe(debounceTime(300))
			.subscribe((_event) => {
				const text = this.inputSearch.nativeElement.value;
				if (text === this._lastSearch) return;
				this.search(text);
			});
	}

	// ANCHOR : Methods

	/**
	 * ? Cierra la sesión
	 * @public
	 */
	public logout(): void {
		this._stateSvc.logout();
	}

	/**
	 * ? Busca entre la lista de colecciones
	 * @public
	 */
	public search(text: string): void {
		this._lastSearch = text;
		console.log('Buscando...', text);
	}
}
