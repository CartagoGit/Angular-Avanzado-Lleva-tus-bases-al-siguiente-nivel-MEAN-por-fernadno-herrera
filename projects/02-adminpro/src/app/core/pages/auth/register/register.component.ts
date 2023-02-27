import { Component } from '@angular/core';

import {
	AbstractControl,
	AbstractControlOptions,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { AuthService } from '../../../../shared/services/http/auth.service';
import { StorageService } from '../../../../shared/services/settings/storage.service';
import { Subscription } from 'rxjs';
import { getCapitalize } from 'projects/02-adminpro/src/app/shared/helpers/string.helper';

type TypeErrors =
	| 'required'
	| 'maxlength'
	| 'minlength'
	| 'pattern'
	| 'min'
	| 'max'
	| 'whitespace'
	| 'samePasswords'
	| 'email';

type TypeMessageErrors = Record<TypeErrors, (params?: any) => string>;

@Component({
	selector: 'auth-register',
	templateUrl: './register.component.html',
	styleUrls: ['../auth.css'],
})
export class RegisterComponent {
	// ANCHOR : Variables
	public formSubmitted = false;
	public showPassword = false;

	private _errorMessage: TypeMessageErrors = {
		required: () => `required`,
		maxlength: (params) => `max ${params.requiredLength} characters`,
		minlength: (params) => `min ${params.requiredLength} characters`,
		pattern: () => `invalid format`,
		max: (params) => `max amount ${params.max}`,
		min: (params) => `min amount ${params.min}`,
		whitespace: () => `no white spaces`,
		samePasswords: () => `different passwords`,
		email: () => `invalid format`,
	};

	public msgErrors = {
		name: '',
		email: '',
		password: '',
		password2: '',
		terms: '',
	};

	public registerForm = this._fb.group(
		{
			name: ['NombreHardcodeado', [Validators.required]],
			email: [
				'email@hardcodeado.com',
				[Validators.required, Validators.email],
			],
			password: ['123456', [Validators.required, Validators.minLength(6)]],
			password2: ['123456', [Validators.required, Validators.minLength(6)]],
			terms: [true, Validators.requiredTrue],
		},
		{
			validators: [this._areSamePasswords('password', 'password2')],
		} as AbstractControlOptions
	);

	private _storage;

	private _subForm!: Subscription;

	// ANCHOR : Constructor
	constructor(
		private _fb: FormBuilder,
		private _authSvc: AuthService,
		private _storageSvc: StorageService
	) {
		this._storage = this._storageSvc.local;
		this._subForm = this._getSubForm();
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
		if (this.registerForm.invalid) return;

		this._authSvc
			.login({
				password: '123456',
				email: 'admin@gmail.com',
				// password: '123456',
				// email: 'email9@gmail.com',
			})
			.subscribe({
				next: (resp) => {
					if (!resp) return;
					console.log(resp);
					this._storage.set('token', resp.token);
				},
			});
	}

	/**
	 * ? Crea y recupera la subscripcion a lo cambios de valores en el formulario
	 * @private
	 * @returns {Subscription}
	 */
	private _getSubForm(): Subscription {
		return this.registerForm.valueChanges.subscribe({
			next: () => {
				for (let key in this.registerForm.controls) {
					const errors = this.registerForm.get(key)?.errors;
					console.log(errors);
					if (!errors) {
						(this.msgErrors as Record<string, string>)[key] = '';
						continue;
					}
					const arrayErrorMessages = Object.entries(errors).map(
						([key, value]) => this._errorMessage[key as TypeErrors](value)
					);
					const listErrorMsg = new Intl.ListFormat('en-GB').format(
						arrayErrorMessages
					);
					(this.msgErrors as Record<string, string>)[key] =
						getCapitalize(listErrorMsg);
				}
			},
		});
	}

	/**
	 * ? Crea validador para comprobar que ambas contraseñas son iguales en un formulario reactivo
	 * @private
	 * @param {string} password1
	 * @param {string} password2
	 * @returns {(ValidationErrors | null)}
	 */
	private _areSamePasswords(
		password1: string,
		password2: string
	): ValidationErrors | null {
		return (formGroup: FormGroup): ValidationErrors | null => {
			//* Recuperamos los controles del formulario
			const passwordControl1: AbstractControl = formGroup.get(password1)!;
			const passwordControl2: AbstractControl = formGroup.get(password2)!;

			//* Seteamos el nombre del error
			const nameError = 'samePasswords';

			if (passwordControl1.value === passwordControl2.value) {
				for (let control of [
					formGroup,
					passwordControl1,
					passwordControl2,
				]) {
					//* Por cada control que afecta el validador,
					// eliminamos el error que estamos testeando
					delete control.errors?.[nameError];
					//* Si no existen mas errores, lo seteamos en null,
					// en caso contrario lo dejamos con el resto de errores
					if (Object.keys(control.errors || {}).length === 0)
						control.setErrors(null);
				}
				return Object.keys(formGroup.errors || {}).length !== 0
					? formGroup.errors
					: null;
			}

			//* En caso de que los password no sean iguales, aplicamos el error,
			// y mantenemos el resto de errores que tengan los controles
			const error = { [nameError]: false };
			passwordControl1.setErrors({ ...passwordControl1.errors, ...error });
			passwordControl2.setErrors({ ...passwordControl2.errors, ...error });

			return { ...formGroup.errors, ...error };
		};
	}
}
