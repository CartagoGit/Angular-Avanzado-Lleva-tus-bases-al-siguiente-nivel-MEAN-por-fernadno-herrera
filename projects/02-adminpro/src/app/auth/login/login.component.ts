import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'auth-login',
	templateUrl: './login.component.html',
	styleUrls: ['../../../assets/css/auth/auth.css'],
})
export class LoginComponent {

	public needRecover = false;

	constructor(private _router: Router) {}

	public login() {
		console.log('submit');
		this._router.navigate(['/']);
	}
}
