import { Component } from '@angular/core';
import { StateService } from './shared/services/settings/state.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	constructor(private _stateSvc: StateService) {
		console.log('init',this._stateSvc.isAuthenticated)

	}
}
