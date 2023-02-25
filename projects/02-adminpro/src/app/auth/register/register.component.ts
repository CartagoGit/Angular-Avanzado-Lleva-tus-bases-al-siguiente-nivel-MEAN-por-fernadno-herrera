import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../assets/css/auth/auth.css'],
})
export class RegisterComponent {

	public registerForm = this._fb.group({
		name: ['nombreee', [Validators.required]],
		email: ['test100@gmail.com', [Validators.required, Validators.email]],
		password : ['123456', [Validators.required, Validators.minLength(6)]],
		password2 : ['123456', [Validators.required, Validators.minLength(6)]],
		terms : [false, Validators.required]
	});

	constructor(private _fb: FormBuilder){}

	createUser() {
		console.log(this.registerForm.value);
	}
}
