import { Component, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EverywhereService } from '../../../shared/services/http/everywhere.service';
import { DefaultErrorResponse } from '../../../shared/interfaces/http/response.interfaces';
import { SweetAlertService } from '../../../shared/services/helpers/sweet-alert.service';
import { tap } from 'rxjs';
import { CollectionModels } from '../../../shared/interfaces/http/everywhere.interfaces';

@Component({
	selector: 'app-global-search',
	templateUrl: './global-search.component.html',
	styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent {
	// ANCHOR : Variables

	public results: WritableSignal<CollectionModels | undefined> =
		signal(undefined);

	// ANCHOR : Constructor
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _everywhereSvc: EverywhereService,
		private _sweetAlertSvc: SweetAlertService
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
		this._everywhereSvc
			.getFrom(
				{ field: 'name', search: query },
				{ limit: 10, pagination: true }
			)
			.pipe(
				tap((resp) => {
					const { ok } = resp;
					if (ok) return;
					throw resp;
				})
			)
			.subscribe({
				next: (resp) => {
					const {
						data: { Users, Doctors, Hospitals },
					} = resp;
					this.results.set({ Users, Doctors, Hospitals });

					console.log('Users', Users);
					console.log('Doctors', Doctors);
					console.log('Hospitals', Hospitals);
				},
				error: (error: DefaultErrorResponse) => {
					console.error(error);
					this._sweetAlertSvc.alertError(error.error_message);
				},
			});
	}
}
