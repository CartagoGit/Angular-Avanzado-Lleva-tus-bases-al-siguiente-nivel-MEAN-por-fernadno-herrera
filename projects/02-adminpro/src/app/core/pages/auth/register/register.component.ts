import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'auth-register',
	templateUrl: './register.component.html',
	styleUrls: ['../auth.css'],
})
export class RegisterComponent {
	public formSubmitted = false;
	public showPassword = false;

	public registerForm = this._fb.group({
		name: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
		password2: ['', [Validators.required, Validators.minLength(6)]],
		terms: [false, Validators.required],
	});

	constructor(private _fb: FormBuilder) {}

	public createUser() {
		this.formSubmitted = true;
		console.log(this.registerForm.value);
	}
}
