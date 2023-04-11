import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hospital } from '../../../shared/models/mongo-models/hospital.model';
import { Store } from '../../../shared/models/store/store.model';
import { HospitalsService } from '../../../shared/services/http/models/hospitals.service';
import { Pagination } from '../../../shared/interfaces/http/pagination.interface';
import { PaginationData } from '../../../shared/interfaces/http/request.interface';
import { DefaultState } from '../../../shared/interfaces/models/store.interface';

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
	};

	// TODO BORRAR, se coloca para evitar errores por ahora
	public isLoading: boolean = false;
	public pagination = undefined;
	public changePage = (page: number) => {};

	public storeHospitals = new Store(this._initState);

	// ANCHOR : Constructor
	constructor(private _hospitalsSvc: HospitalsService) {}

	// ANCHOR : Methods
}
