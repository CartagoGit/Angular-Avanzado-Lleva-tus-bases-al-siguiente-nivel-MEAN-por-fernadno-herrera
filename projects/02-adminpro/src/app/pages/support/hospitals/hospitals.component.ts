import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hospital } from '../../../shared/models/mongo-models/hospital.model';
import { Store } from '../../../shared/models/store/store.model';
import { HospitalsService } from '../../../shared/services/http/models/hospitals.service';
import { Pagination } from '../../../shared/interfaces/http/pagination.interface';
import { PaginationData } from '../../../shared/interfaces/http/request.interface';
import { DefaultState } from '../../../shared/interfaces/models/store.interface';
import { debounceTime, delay, finalize, skip, Subscription, tap } from 'rxjs';
import { minTimeBeforeLoader } from '../../../shared/constants/time.constants';
import { SweetAlertService } from '../../../shared/services/helpers/sweet-alert.service';
import { DefaultErrorResponse } from '../../../shared/interfaces/http/response.interfaces';

@Component({
	selector: 'page-hospitals',
	templateUrl: './hospitals.component.html',
	styleUrls: ['./hospitals.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HospitalsComponent {
	//!! Podriamos copiar exactamente lo mismo que hicimos en el componente de usuarios, pero en este caso lo haremos con un stopre y onPush para aprender nuevas técnicas
	// ANCHOR : Variables
	private _initState: DefaultState<Hospital> = {
		isLoading: false,
		data: [] as Hospital[],
		meta: {} as Pagination,
		pagination: { limit: 5, page: 1 } as PaginationData,
		search: '',
	};
	private subscriptions: Subscription[] = [];

	public store = new Store(this._initState);

	public state$ = this.store.state$;
	public hospitals$ = this.store.params.data$;
	public pagination$ = this.store.params.pagination$.pipe(skip(1));
	public meta$ = this.store.params.meta$;
	public search$ = this.store.params.search$.pipe(skip(1), debounceTime(500));
	public isLoading$ = this.store.params.isLoading$.pipe(
		debounceTime(minTimeBeforeLoader)
	);

	// ANCHOR : Constructor
	constructor(
		private _hospitalsSvc: HospitalsService,
		private _sweetAlertSvc: SweetAlertService
	) {
		this.search();
		this._createSubscriptions();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
		this.store.endState();
	}

	// ANCHOR : Methods
	private _createSubscriptions() {
		const paginationSub = this.pagination$.subscribe((pagination) => {
			this.search();
		});
		const searchSub = this.search$.subscribe((search) => {
			this.search();
		});

		// const stateSub = this.state$.subscribe((state) => {
		// 	console.log(state);
		// 	if (!state) return;
		// });

		this.subscriptions.push(
			paginationSub,
			searchSub
			// stateSub
		);
	}

	/**
	 * ? Busca en la base de datos
	 * @private
	 */
	public search() {
		this.store.setParam('isLoading', true);
		const search = this.store.getParam('search');
		this._hospitalsSvc
			.getByQuery(
				{ name: search, address: search },
				{ ...this.store.getParam('pagination'), someQuery: true }
			)
			.pipe(
				finalize(() => {
					this.store.setParam('isLoading', false);
				})
			)
			.subscribe((resp) => {
				const { data, pagination } = resp;
				if (!data || !pagination) return;
				this.store.setState({
					...this.store.getState(),
					data,
					meta: pagination,
					isLoading: false,
				});
			});
	}

	/**
	 * ? Cambia la pagina de la paginacion
	 * @public
	 * @param {number} page
	 */
	public changePage(page: number) {
		this.store.setParam('pagination', {
			...this.store.getParam('pagination'),
			page,
		});
	}

	/**
	 * ? Elimina un hospital
	 * @public
	 * @param {Hospital} hospital
	 */
	public delete(hospital: Hospital) {
		this._sweetAlertSvc
			.confirmDeleteModal({
				title: 'Delete hospital',
				text: `Are you sure you want to delete the hospital '${hospital.name}'?`,
				icon: 'warning',
			})
			.then((result) => {
				if (!result.isConfirmed) return;
				this._hospitalsSvc.delete(hospital.id).subscribe({
					next: () => {
						this._sweetAlertSvc.alertSuccess('User deleted correctly');
						this.search();
					},
					error: (err: DefaultErrorResponse) => {
						this._sweetAlertSvc.alertError(err.error_message);
					},
				});
			});
	}
}
