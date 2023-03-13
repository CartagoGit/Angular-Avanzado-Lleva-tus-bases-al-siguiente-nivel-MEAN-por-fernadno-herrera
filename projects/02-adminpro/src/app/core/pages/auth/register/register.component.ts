import { Component } from '@angular/core';

import {
	AbstractControlOptions,
	FormBuilder,
	Validators,
} from '@angular/forms';
import { AuthService } from '../../../../shared/services/http/auth.service';
import { StorageService } from '../../../../shared/services/settings/storage.service';
import { Subscription } from 'rxjs';
import { DefaultErrorResponse } from '../../../../shared/services/http/interfaces/response.interfaces';
import { ValidatorService } from 'projects/02-adminpro/src/app/shared/services/helpers/validator.service';
import { SweetAlertService } from '../../../../shared/services/helpers/sweet-alert.service';
import { AuthDefaultResponse } from 'projects/02-adminpro/src/app/shared/services/http/interfaces/request.interface';
import { Router } from '@angular/router';
import { paths } from '../../../../shared/constants/paths.constant';
import { StateService } from 'projects/02-adminpro/src/app/shared/services/settings/state.service';

@Component({
	selector: 'auth-register',
	templateUrl: './register.component.html',
	styleUrls: ['../auth.css'],
})
export class RegisterComponent {
	// ANCHOR : Variables
	public formSubmitted = false;
	public showPassword = false;

	public termsPath = paths.getPath('terms');
	public loginPath = paths.getPath('login');

	public msgErrors = {
		name: '',
		email: '',
		password: '',
		password2: '',
		terms: '',
	};

	public registerForm = this._fb.group(
		{
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			password2: ['', [Validators.required, Validators.minLength(6)]],
			terms: [false, Validators.requiredTrue],
		},
		{
			validators: [
				this._validatorSvc.areSamePasswords('password', 'password2'),
			],
		} as AbstractControlOptions
	);

	private _storage;

	private _subForm!: Subscription;

	// ANCHOR : Constructor
	constructor(
		private _fb: FormBuilder,
		private _authSvc: AuthService,
		private _storageSvc: StorageService,
		private _validatorSvc: ValidatorService,
		private _sweetAlertSvc: SweetAlertService,
		private _router: Router,
		private _stateSvc: StateService
	) {
		this._storage = this._storageSvc.local;
		this._subForm = this._validatorSvc.getSubForm(
			this.registerForm,
			this.msgErrors
		);
	}

	ngOnDestroy(): void {
		this._subForm.unsubscribe();
	}

	// ANCHOR : Métodos

	/**
	 * ? Registra un nuevo usuario si es valido
	 * @public
	 */
	public register(): void {
		this.formSubmitted = true;
		if (this.registerForm.invalid) {
			this._validatorSvc.renewMsgErrors(this.registerForm, this.msgErrors);
			return;
		}

		const body: AuthDefaultResponse = {
			name: this.registerForm.get('name')?.value!,
			password: this.registerForm.get('password')?.value!,
			email: this.registerForm.get('email')?.value!,
		};

		this._authSvc.register(body).subscribe({
			next: (resp) => {
				if (!resp) return;
				this._stateSvc.login(resp.token!);
			},
			error: (error: DefaultErrorResponse) => {
				console.error(error);
				this._storage.delete('token');

				if (
					!!error.error_data?.keyValue?.email?.msg.includes(
						'That param must be unique'
					)
				) {
					this.registerForm
						.get('email')
						?.setErrors({ emailRegistered: true });
				} else {
					this._sweetAlertSvc.alertError(
						'You cannot register a new account'
					);
				}
				this._validatorSvc.renewMsgErrors(
					this.registerForm,
					this.msgErrors
				);
			},
		});
	}

	/**
	 * ? Resetea el estado del formulario
	 */
	public valueChange() {
		this.formSubmitted = false;
		this._validatorSvc.cleanErrors(this.registerForm);
	}
}
