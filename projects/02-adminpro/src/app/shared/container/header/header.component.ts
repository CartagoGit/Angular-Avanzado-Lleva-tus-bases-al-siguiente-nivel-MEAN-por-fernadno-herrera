import { Component, ElementRef, ViewChild } from '@angular/core';
import { paths } from '../../constants/paths.constant';
import { StateService } from '../../services/settings/state.service';
import { User } from '../../models/mongo-models/user.model';
import { Subscription, debounceTime, filter, fromEvent } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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
	private _lastRoute: string = '';
	private subscriptions: Subscription[] = [];

	// ANCHOR : Constructor
	constructor(private _stateSvc: StateService, private _router: Router) {
		this.user = this._stateSvc.user!;
	}

	ngAfterViewInit(): void {
		const routeChangedSub = this._router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event) => {
				const url = (event as NavigationEnd).url;
				if (!url.includes(paths.getPath('global-search')?.path!))
					this._lastRoute = url;
			});

		const inputSub = fromEvent(this.inputSearch.nativeElement, 'input')
			.pipe(debounceTime(300))
			.subscribe((_event) => {
				const text = this.inputSearch.nativeElement.value;
				if (
					text.trim().toLowerCase() ===
					this._lastSearch.trim().toLowerCase()
				)
					return;
				if (text.trim().length === 0) {
					this._router.navigateByUrl(this._lastRoute|| paths.getPath('dashboard')?.fullPath!);
					return;
				}
				this.search(text.trim());
			});

		this.subscriptions.push(routeChangedSub, inputSub);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => !sub.closed && sub.unsubscribe());
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
		this._router.navigateByUrl(
			`${paths.getPath('global-search')?.fullPath}/${text}`
		);
	}
}
