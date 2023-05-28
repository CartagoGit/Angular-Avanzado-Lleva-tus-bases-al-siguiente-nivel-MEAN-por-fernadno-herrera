import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EverywhereService } from '../../../shared/services/http/everywhere.service';

@Component({
	selector: 'app-global-search',
	templateUrl: './global-search.component.html',
	styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent {
	// ANCHOR : Variables

	// ANCHOR : Constructor
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _everywhereSvc: EverywhereService
	) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe((params) => {
			const { query } = params;
			this._search(query);
		});
	}

	// ANCHOR : Methods

	/**
	 * ? Busca en las colecciones de la base de datos el texto dentro del campo que se solicite, en este caso name
	 * @private
	 * @param {string} query
	 */
	private _search(query: string): void {
		console.log(query);
		this._everywhereSvc.getFrom({ field: 'name', search: query }, {}).subscribe(
			(data) => {
				console.log(data);
			}
		);
	}
}
