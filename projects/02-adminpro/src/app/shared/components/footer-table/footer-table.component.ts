import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../interfaces/http/pagination.interface';

//* Resultados a mostrar en el footer
interface Result {
	label: string;
	value: string | number;
}

@Component({
	selector: 'app-footer-table',
	templateUrl: './footer-table.component.html',
	styleUrls: ['./footer-table.component.css'],
})
export class FooterTableComponent {
	// ANCHOR : Variables
	private _pagination?: Pagination;
	@Input('pagination') set pagination(value: Pagination | undefined) {
		if (!value) return;
		this._pagination = value;
		this.pagesShowed = this._calculatePagesShowed();
	}
	get pagination(): Pagination | undefined {
		return this._pagination;
	}

	@Input('showTotal') showTotal: boolean = true;
	@Input('results') results: Result[] = [];

	@Output('pageChanged') pageChanged = new EventEmitter<number>();

	public pagesShowed: number[] = [];

	// ANCHOR: Constructor
	constructor() {}

	// ANCHOR: Methods
	/**
	 * ? Calcula las paginas que se mostraran en el footer
	 * @private
	 * @returns {number[]}
	 */
	private _calculatePagesShowed(): number[] {
		const pagesShowed: number[] = [];
		const { totalPages, page } = this.pagination!;
		let start = page - 2;
		let end = page + 2;

		if (start < 1) {
			start = 1;
			end = 5;
		}

		if (end > totalPages) {
			end = totalPages;
			if (totalPages - 4 > 1) start = totalPages - 4;
		}

		for (let i = start; i <= end; i++) {
			pagesShowed.push(i);
		}

		return pagesShowed;
	}

	/**
	 * ? Cambia la pagina
	 * @public
	 * @param {number} page
	 */
	public changePage(page: number) {
		if (page === this.pagination?.page) return;
		this.pageChanged.emit(page);
	}
}
