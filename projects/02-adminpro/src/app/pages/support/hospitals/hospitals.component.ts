import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hospital } from '../../../shared/models/mongo-models/hospital.model';
import { Store } from '../../../shared/models/store/store.model';
import { HospitalsService } from '../../../shared/services/http/models/hospitals.service';
import { Pagination } from '../../../shared/interfaces/http/pagination.interface';
import { PaginationData } from '../../../shared/interfaces/http/request.interface';
import { DefaultState } from '../../../shared/interfaces/models/store.interface';
import { finalize, Subscription, tap } from 'rxjs';

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

	public store = new Store(this._initState);

	public state$ = this.store.state$;
	public hospitals$ = this.store.params.data$;
	public pagination$ = this.store.params.pagination$;
	public meta$ = this.store.params.meta$;
	public search$ = this.store.params.search$;
	public isLoading$ = this.store.params.isLoading$;

	private subscriptions : Subscription[] = []

	// ANCHOR : Constructor
	constructor(private _hospitalsSvc: HospitalsService) {
		this._createSubscriptions();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	// ANCHOR : Methods
	private _createSubscriptions() {
		const paginationSub = this.pagination$.subscribe((pagination) => {
			this._search();
		});
		const searchSub = this.search$.subscribe((search) => {
			this._search();
		});

		this.subscriptions.push(paginationSub, searchSub);

	}

	private _search() {
		this._hospitalsSvc
			.getByQuery({})
			.pipe(
				tap(() => {
					this.store.setParam('isLoading', true);
				}),
				finalize(() => {
					this.store.setParam('isLoading', false);
				})
			)
			.subscribe((resp) => {
				const { data } = resp;
				if (!data) return;
				this.store.setState({
					...this.store.getState(),
					data,
					isLoading: false,
				});
			});
	}

	public changePage(page: number) {
		this.store.setParam('pagination', {
			...this.store.getParam('pagination'),
			page,
		});
	}
}
