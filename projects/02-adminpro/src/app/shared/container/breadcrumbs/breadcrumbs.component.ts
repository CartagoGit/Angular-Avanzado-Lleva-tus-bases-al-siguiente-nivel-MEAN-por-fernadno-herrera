import { Component } from '@angular/core';
import {  ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styles: [],
})
export class BreadcrumbsComponent {
	private _tituloSubs$!: Subscription;
	public titulo: string = '';

	constructor(private router: Router, ) {
		this._tituloSubs$ = this._getArgsRouter();
	}

	ngOnDestroy(): void {
		this._tituloSubs$.unsubscribe();
	}

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
				// console.log(titulo);
				this.titulo = titulo;
				document.title = `AdminPro - ${titulo}`;
			});
	}
}
