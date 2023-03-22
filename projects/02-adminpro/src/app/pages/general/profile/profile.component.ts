import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../shared/models/mongo-models/user.model';
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

	public profileForm: FormGroup = this._fb.group({
		name: [''],
		email: [''],
		password: [''],
		password2: [''],
	});

	// ANCHOR : Constructor
	constructor(private _fb: FormBuilder, private _state: StateService, private _usersSvc: UsersService) {
		this.user = this._state.user!;
		this._usersSvc.getAll().subscribe((res) => console.log(res));
		this._createProfileForm();
		console.log(this.profileForm);
	}

	ngOnInit(): void {}

	// ANCHOR : Methods

	/**
	 * ? Actualiza el perfil
	 * @public
	 */
	public updateProfile() {
		this.isSubmited = true;
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
		this.profileForm = this._fb.group({
			name: [
				{ value: this.user.name, disabled: this.user.google },
				[Validators.required],
			],
			email: [
				{ value: this.user.email, disabled: this.user.google },
				[Validators.required, Validators.email],
			],
			password: [{ value: '', disabled: this.user.google }],
			password2: [{ value: '', disabled: this.user.google }],
		});
	}
}
