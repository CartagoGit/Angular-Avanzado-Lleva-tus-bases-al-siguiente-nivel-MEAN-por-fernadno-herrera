import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'projects/02-adminpro/src/app/shared/services/settings/storage.service';
import { Subscription } from 'rxjs';
import { ValidatorService } from '../../../../shared/services/helpers/validator.service';
import { AuthService } from '../../../../shared/services/http/auth.service';
import { AuthDefaultResponse } from '../../../../shared/services/http/interfaces/request.interface';
import { DefaultErrorResponse } from '../../../../shared/services/http/interfaces/response.interfaces';
import { SweetAlertService } from '../../../../shared/services/helpers/sweet-alert.service';

@Component({
	selector: 'auth-login',
	templateUrl: './login.component.html',
	styleUrls: ['../auth.css'],
})
export class LoginComponent {
	// ANCHOR : variables
	public needRecover = false;
	public formSubmitted = false;
	public showPassword = false;

	public msgErrors = {
		email: '',
		password: '',
	};

	public loginForm = this._fb.group({
		email: ['email@hardcodeado.com', [Validators.required, Validators.email]],
		password: ['123456', [Validators.required]],
		remember: [false],
	});

	private _storage;

	private _subForm!: Subscription;

	// ANCHOR : Constructor
	constructor(
		private _router: Router,
		private _validatorSvc: ValidatorService,
		private _fb: FormBuilder,
		private _authSvc: AuthService,
		private _storageSvc: StorageService,
		private _sweetAlert: SweetAlertService
	) {
		this._storage = this._storageSvc.local;
		this._subForm = this._validatorSvc.getSubForm(
			this.loginForm,
			this.msgErrors
		);
	}

	ngOnDestroy(): void {
		this._subForm.unsubscribe();
	}

	// ANCHOR : Métodos
	public login() {
		this.formSubmitted = true;
		if (this.loginForm.invalid) return;
		const body: AuthDefaultResponse = {
			password: this.loginForm.get('password')?.value!,
			email: this.loginForm.get('email')?.value!,
		};
		this._authSvc.login(body).subscribe({
			next: (resp) => {
				if(!resp) return
				this._storage.set('token', resp.token);
				console.log('❗this._authSvc.login  ➽ resp ➽ ⏩', resp);
			},
			error: (error: DefaultErrorResponse) => {
				if (error.error_data.reason === 'email or password incorrect') {
					const error = { emailOrPassCorrect: false };
					this.loginForm.get('email')?.setErrors(error);
					this.loginForm.get('password')?.setErrors(error);
				} else this._sweetAlert.alertError('You cannot Sign in');
				console.log('❗this._authSvc.login  ➽ error ➽ ⏩', error);
				this._storage.delete('token');
				this._validatorSvc.renewMsgErrors(this.loginForm, this.msgErrors);
			},
		});

		// this._router.navigate(['/']);
	}
}
