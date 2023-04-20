import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
} from '@angular/core';
import { Subscription, skip, debounceTime, finalize } from 'rxjs';
import { minTimeBeforeLoader } from '../../../shared/constants/time.constants';
import { Pagination } from '../../../shared/interfaces/http/pagination.interface';
import { PaginationData } from '../../../shared/interfaces/http/request.interface';
import { DefaultState } from '../../../shared/interfaces/models/store.interface';
import { Doctor } from '../../../shared/models/mongo-models/doctor.model';
import { Store } from '../../../shared/models/store/store.model';
import { SweetAlertService } from '../../../shared/services/helpers/sweet-alert.service';
import { DoctorsService } from '../../../shared/services/http/models/doctors.service';
import { ModalService } from '../../../shared/services/settings/modal.service';

@Component({
	selector: 'page-doctors',
	templateUrl: './doctors.component.html',
	styleUrls: ['./doctors.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorsComponent {
	// ANCHOR : Variables
	private _initState: DefaultState<Doctor> = {
		isLoading: false,
		data: [] as Doctor[],
		meta: {} as Pagination,
		pagination: { limit: 5, page: 1 } as PaginationData,
		search: '',
	};
	private subscriptions: Subscription[] = [];

	// GROUP Store
	public store = new Store(this._initState);
	//* Observables
	public state$ = this.store.state$;
	public doctors$ = this.store.params.data$;
	public pagination$ = this.store.params.pagination$.pipe(skip(1));
	public meta$ = this.store.params.meta$;
	public search$ = this.store.params.search$.pipe(skip(1), debounceTime(500));
	public isLoading$ = this.store.params.isLoading$.pipe(
		debounceTime(minTimeBeforeLoader)
	);

	//!GROUP Store

	// ANCHOR : Constructor
	constructor(
		private _doctorsSvc: DoctorsService,
		private _sweetAlertSvc: SweetAlertService,
		private _modalSvc: ModalService,
		private _cd: ChangeDetectorRef
	) {
		this.search();
		this._createSubscriptions();
	}

	// ANCHOR : Methods

	/**
	 * ? Crea las subscripciones al store
	 * @private
	 */
	private _createSubscriptions() {
		const paginationSub = this.pagination$.subscribe((pagination) => {
			this.search();
		});
		const searchSub = this.search$.subscribe((search) => {
			this.search();
		});

		this.subscriptions.push(paginationSub, searchSub);
	}

	/**
	 * ? Busca en la base de datos
	 * @private
	 */
	public search() {
		this.store.setParam('isLoading', true);
		const search = this.store.getParam('search');
		this._doctorsSvc
			.getByQuery(
				{},
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
					data: data.map((doctor) => new Doctor(doctor)),
					meta: pagination,
					isLoading: false,
				});
			});
	}
}
