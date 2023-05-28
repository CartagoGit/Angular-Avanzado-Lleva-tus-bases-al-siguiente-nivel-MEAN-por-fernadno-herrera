import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-global-search',
	templateUrl: './global-search.component.html',
	styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent {
	// ANCHOR : Variables

	// ANCHOR : Constructor
	constructor(private _activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {

		this._activatedRoute.params.subscribe((params) => {
			const { query } = params;
			
		});

	}

	// ANCHOR : Methods

}
