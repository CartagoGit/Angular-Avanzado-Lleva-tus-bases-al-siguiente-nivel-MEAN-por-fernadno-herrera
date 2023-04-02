import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../interfaces/http/pagination.interface';

//* Resultados a mostrar en el footer
interface Result {
	label: string;
	result: string | number;
}

@Component({
	selector: 'app-footer-table',
	templateUrl: './footer-table.component.html',
	styleUrls: ['./footer-table.component.css'],
})
export class FooterTableComponent {
	// ANCHOR : Variables
	@Input('pagination') pagination?: Pagination;
	@Input('showTotal') showTotal: boolean = true;
	@Input('results') results: Result[] = [];

	@Output('pageChange') pageChange = new EventEmitter<number>();

	

	// ANCHOR: Constructor
	constructor() {}

	// ANCHOR: Methods
}
