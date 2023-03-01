import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/http/auth.service';
import { StorageService } from './shared/services/settings/storage.service';
import { StateService } from './shared/services/settings/state.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	constructor(
		private _router: Router,
		private _authSvc: AuthService,
		private _storageSvc: StorageService,
		private _stateSvc: StateService
	) {
		this._router.events
			.pipe(filter((event) => event instanceof NavigationStart))
			.subscribe((_event) => {
				this._authSvc
					.renewToken(this._storageSvc.local.get('token') as string)
					.subscribe({
						next: (_resp) => {
							this._stateSvc.isAuthenticated = true;
						},
						error: (_error) => {
							this._stateSvc.isAuthenticated = false;
							console.log("❗.subscribe  ➽ isAuthenticated ➽ ⏩" , this._stateSvc.isAuthenticated);
						},
					});
			});
	}
}
