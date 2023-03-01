import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/http/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	constructor(private _router: Router, private _authSvc: AuthService) {
		this._router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event) => {
				this._authSvc.root().subscribe()
				console.log((event as NavigationEnd).url);
				if ((event as NavigationEnd).url !== '/maintenance') {



				} else {

				}

				// this.routerChangeMethod(event.url);
			});
	}
}
