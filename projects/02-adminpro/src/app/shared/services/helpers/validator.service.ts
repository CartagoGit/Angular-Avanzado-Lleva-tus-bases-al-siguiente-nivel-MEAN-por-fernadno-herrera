import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { getCapitalize } from '../../helpers/string.helper';

//* Tipos de validadores de errores
export type TypeValidatorErrors =
	| 'required'
	| 'maxlength'
	| 'minlength'
	| 'pattern'
	| 'min'
	| 'max'
	| 'whitespace'
	| 'samePasswords'
	| 'email'
	| 'emailRegistered'
	| 'emailOrPassCorrect';

//* Tipo de los mensajes de error
export type TypeValidatorMessageErrors = Record<
	TypeValidatorErrors,
	(params?: any) => string
>;

@Injectable({
	providedIn: 'root',
})
export class ValidatorService {
	// ANCHOR : Variables
	/**
	 * ? Objeto con posibles mensajes de error segun el validador
	 * @public
	 * @readonly
	 * @type {TypeValidatorMessageErrors}
	 */
	public readonly errorMessage: TypeValidatorMessageErrors = {
		required: () => `required`,
		maxlength: (params) => `max ${params.requiredLength} characters`,
		minlength: (params) => `min ${params.requiredLength} characters`,
		pattern: () => `invalid format`,
		max: (params) => `max amount ${params.max}`,
		min: (params) => `min amount ${params.min}`,
		whitespace: () => `no white spaces`,
		samePasswords: () => `different passwords`,
		email: () => `invalid format`,
		emailRegistered: () => `email already registered`,
		emailOrPassCorrect: () => `email or password are incorrect`
	};

	// ANCHOR : Constructor
	constructor() {}

	// ANCHOR : Metodos
	/**
	 * ? Crea validador para comprobar que ambas contraseñas son iguales en un formulario reactivo
	 * @private
	 * @param {string} password1
	 * @param {string} password2
	 * @returns {(ValidationErrors | null)}
	 */
	public areSamePasswords(
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

	/**
	 * ? Renueva los mensajes de error de los controles del formulario
	 * @public
	 */
	public renewMsgErrors(
		formGroup: FormGroup,
		msgErrors: Record<string, string>
	) {
		for (let key in formGroup.controls) {
			const errors = formGroup.get(key)?.errors;
			if (!errors) {
				msgErrors[key] = '';
				continue;
			}
			const arrayErrorMessages = Object.entries(errors).map(([key, value]) =>
				this.errorMessage[key as TypeValidatorErrors](value)
			);
			const listErrorMsg = new Intl.ListFormat('en-GB').format(
				arrayErrorMessages
			);
			msgErrors[key] = getCapitalize(listErrorMsg);
		}
	}

	/**
	 * ? Crea y recupera la subscripcion a lo cambios de valores en el formulario
	 * @public
	 * @param {FormGroup} formGroup
	 * @param {Record<string, string>} msgErrors
	 * @returns {Subscription}
	 */
	public getSubForm(formGroup : FormGroup, msgErrors: Record<string, string>): Subscription {
		return formGroup.valueChanges.subscribe({
			next: () => {
				this.renewMsgErrors(
					formGroup,
					msgErrors
				);
			},
		});
	}
}
