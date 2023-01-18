import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['../../../assets/css/auth/auth.css'],
})
export class LoginComponent {
	constructor(private _router: Router) {}

	public login() {
		console.log('submit');
		this._router.navigate(['/']);
	}
}
