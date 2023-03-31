import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styles: [],
})
export class BreadcrumbsComponent {
	// ANCHOR : Variables
	private _tituloSubs$!: Subscription;
	public titulo: string = '';

	// ANCHOR : Constructor
	constructor(private router: Router) {
		this._tituloSubs$ = this._getArgsRouter();
	}

	ngOnDestroy(): void {
		this._tituloSubs$.unsubscribe();
	}

	// ANCHOR : Methods

	/**
	 * ? Obtiene los argumentos del router para mostrar el titulo en el docoumento
	 * @returns {*}
	 */
	private _getArgsRouter(): Subscription {
		return this.router.events
			.pipe(
				filter(
					(event): event is ActivationEnd =>
						event instanceof ActivationEnd &&
						!!event.snapshot.routeConfig?.data
				),
				map((event) => event.snapshot.data)
			)
			.subscribe(({ titulo }) => {
				this.titulo = titulo;
				document.title = `AdminPro - ${titulo}`;
			});
	}
}
