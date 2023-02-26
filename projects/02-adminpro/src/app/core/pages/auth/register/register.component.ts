import { Component } from '@angular/core';
import {
	AbstractControl,
	AbstractControlOptions,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'auth-register',
	templateUrl: './register.component.html',
	styleUrls: ['../auth.css'],
})
export class RegisterComponent {
	public formSubmitted = false;
	public showPassword = false;

	public registerForm = this._fb.group(
		{
			name: ['NombreHardcodeado', [Validators.required]],
			email: [
				'email@hardcodeado.com',
				[Validators.required, Validators.email],
			],
			password: ['', [Validators.required, Validators.minLength(6)]],
			password2: ['', [Validators.required, Validators.minLength(6)]],
			terms: [true, Validators.requiredTrue],
		},
		{
			validators: [this._areSamePasswords('password', 'password2')],
		} as AbstractControlOptions
	);

	constructor(private _fb: FormBuilder) {}

	public createUser(): void {
		this.formSubmitted = true;
		console.log(this.registerForm);
	}

	private _areSamePasswords(
		password1: string,
		password2: string
	): ValidationErrors | null {
		return (formGroup: FormGroup): ValidationErrors | null => {
			//* Recuperamos los controles del formulario
			const passwordControl1: AbstractControl = formGroup.get(password1)!;
			const passwordControl2: AbstractControl = formGroup.get(password2)!;

			//* Seteamos el nombre del error
			const nameError = 'arentSamePasswords';

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
			const error = { [nameError]: true };
			passwordControl1.setErrors({ ...passwordControl1.errors, ...error });
			passwordControl2.setErrors({ ...passwordControl2.errors, ...error });
			return { ...formGroup.errors, ...error };
		};
	}
}
