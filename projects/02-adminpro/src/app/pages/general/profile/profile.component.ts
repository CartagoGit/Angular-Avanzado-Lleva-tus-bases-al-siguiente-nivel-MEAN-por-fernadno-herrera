import { Component } from '@angular/core';
import {
	FormBuilder,
	Validators,
	AbstractControlOptions,
} from '@angular/forms';
import { User } from '../../../shared/models/mongo-models/user.model';
import { ValidatorService } from '../../../shared/services/helpers/validator.service';
import { UsersService } from '../../../shared/services/http/models/users.service';
import { StateService } from '../../../shared/services/settings/state.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
	// ANCHOR : Variables
	public showPassword: boolean = false;
	public isSubmited: boolean = false;

	public user: User;

	public profileForm = this._fb.group({
		name: [''],
		email: [''],
		password: [''],
		password2: [''],
	});

	// ANCHOR : Constructor
	constructor(
		private _fb: FormBuilder,
		private _state: StateService,
		private _usersSvc: UsersService,
		private _validatorSvc: ValidatorService
	) {
		this.user = this._state.user!;
		// this._usersSvc.getAll().subscribe((resp) => {
		// 	const { data } = resp;
		// 	console.log(data);
		// });
		this._usersSvc.getByQuery({  }).subscribe((resp) => {
			console.log(resp);
		});
		this._createProfileForm();
	}

	ngOnInit(): void {}

	// ANCHOR : Methods

	/**
	 * ? Actualiza el perfil
	 * @public
	 */
	public updateProfile() {
		this.isSubmited = true;
		if (this.profileForm.invalid || !this._isUserChanged()) return;
		console.log(this.profileForm.value);
	}

	/**
	 * ? Actualiza la imagen del perfil
	 * @public
	 */
	public updateImage() {}

	/**
	 * ? Crea el formulario del perfil
	 * @private
	 */
	private _createProfileForm(): void {
		this.profileForm = this._fb.group(
			{
				name: [
					{ value: this.user.name, disabled: this.user.google },
					[Validators.required],
				],
				email: [
					{ value: this.user.email, disabled: this.user.google },
					[Validators.required, Validators.email],
				],
				password: [
					{ value: '', disabled: this.user.google },
					[Validators.minLength(6)],
				],
				password2: [
					{ value: '', disabled: this.user.google },
					[Validators.minLength(6)],
				],
			},
			{
				validators: [
					this._validatorSvc.areSamePasswords('password', 'password2'),
				],
			} as AbstractControlOptions
		);
	}

	/**
	 * ? Valida si el usuario ha cambiado
	 * @private
	 * @returns {boolean}
	 */
	private _isUserChanged(): boolean {
		return (
			this.user.name !== this.profileForm.get('name')?.value ||
			this.user.email !== this.profileForm.get('email')?.value
		);
	}
}
