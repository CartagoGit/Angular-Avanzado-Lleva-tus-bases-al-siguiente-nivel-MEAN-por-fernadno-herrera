import { Component } from '@angular/core';
import {
	FormBuilder,
	Validators,
	AbstractControlOptions,
} from '@angular/forms';
import {
	User,
	UserProps,
} from '../../../shared/models/mongo-models/user.model';
import { ValidatorService } from '../../../shared/services/helpers/validator.service';
import { UsersService } from '../../../shared/services/http/models/users.service';
import { StateService } from '../../../shared/services/settings/state.service';
import { Roles } from '../../../shared/interfaces/roles.interface';
import { SweetAlertService } from '../../../shared/services/helpers/sweet-alert.service';
import { ModelPropsAndId } from '../../../shared/interfaces/models/base-model-utils.interface';
import { FilesService } from '../../../shared/services/http/files.service';
import { DefaultErrorResponse } from '../../../shared/interfaces/http/response.interfaces';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
	// ANCHOR : Variables
	public showPassword: boolean = false;
	public isSubmited: boolean = false;
	public image: { name: string; file?: File; url?: string } = {
		name: '',
	};

	public user: User;

	public profileForm = this._fb.group({
		name: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.minLength(6)]],
		password2: ['', [Validators.minLength(6)]],
		images: [[] as File[]],
		role: ['USER_ROLE' as Roles, [Validators.required]], // TODO
	});

	// ANCHOR : Constructor
	constructor(
		private _fb: FormBuilder,
		private _state: StateService,
		private _usersSvc: UsersService,
		private _validatorSvc: ValidatorService,
		private _sweetAlertSvc: SweetAlertService,
		private _filesSvc: FilesService
	) {
		this.user = this._state.user!;
		this._createProfileForm();
	}

	ngOnInit(): void {}

	// ANCHOR : Methods

	/**
	 * ? Actualiza el perfil
	 * @public
	 */
	public updateProfile(): void {
		this.isSubmited = true;
		const { password = '', email, name, role } = this.profileForm.value;
		if (!this._isValidFields()) return;

		const modelProps: ModelPropsAndId<UserProps> = {
			id: this.user.id,
			email: email === this.user.email ? undefined : email!,
			name: name === this.user.name ? undefined : name!,
			role: role === this.user.role ? undefined : role!,
			password: password ? password : undefined,
		};
		this._usersSvc.put(modelProps).subscribe({
			next: (resp) => {
				// this.user = new User(resp.data_before!)
				this.user.updateOnlyProps({ ...resp.data! });
				this._sweetAlertSvc.alertSuccess('Profile updated');
				// this._state.user = this.user;
			},
		});
	}

	/**
	 * ? Actualiza la imagen del perfil
	 * @public
	 */
	public updateImageProfile(): void {
		const images = this.profileForm.get('images')?.value;
		if (!images || !Array.isArray(images) || images.length === 0) return;
		this._filesSvc
			.uploadFile({
				filesToUpload: images!,
				id: this.user.id,
				typeFile: 'images',
				typeModel: 'users',
			})
			.subscribe({
				next: (resp) => {
					this.user.updateOnlyImages({ images: resp.filesRoute });
					this._sweetAlertSvc.alertSuccess('Image updated');
				},
				error: (error: DefaultErrorResponse) => {
					this._sweetAlertSvc.alertError(error.error_message);
				},
			});
	}

	/**
	 * ? Cambia la imagen seleccionada que se actualizara en el perfil
	 * @public
	 * @param {Event} event
	 */
	public changeImage(event: Event): void {
		const filesList: FileList | null = (event.target as HTMLInputElement)
			.files;
		if (!filesList || !filesList[0]) {
			this.image = { name: '' };
			return;
		}

		this.image = {
			...this.image,
			file: filesList[0],
			name: filesList[0].name,
			url: URL.createObjectURL(filesList[0]),
		};
		this.profileForm.get('images')!.setValue(Array.from(filesList));
	}

	/**
	 * ? Valida si el formulario tiene los campos correctos y validos
	 * @private
	 * @returns {boolean}
	 */
	private _isValidFields(): boolean {
		if (this.profileForm.invalid || !this._isUserChanged()) {
			this._sweetAlertSvc.alertError('Form not valid or user not changed');
			return false;
		}
		const {
			password = '',
			password2 = '',
			email,
			name,
			role,
		} = this.profileForm.value;

		if (!email || !name || !role) {
			this._sweetAlertSvc.alertError('Email, name and role are required');
			return false;
		}
		if (
			password!.length !== 0 &&
			password2!.length !== 0 &&
			(password !== password2 || password!.length < 6)
		) {
			this._sweetAlertSvc.alertError(
				'Passwords must be equal and have at least 6 characters'
			);
			return false;
		}

		return true;
	}

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
				email: [{ value: this.user.email, disabled: this.user.google }],
				password: [
					{ value: '', disabled: this.user.google },
					[Validators.minLength(6)],
				],
				password2: [{ value: '', disabled: this.user.google }],
				// role: [{ value: this.user.role, disabled: true }],
				role: [this.user.role],
				images: [{ value: [] as File[], disabled: this.user.google }],
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
		const valueChanges = {
			name: this.user.name !== this.profileForm.get('name')?.value,
			email: this.user.email !== this.profileForm.get('email')?.value,
			role: this.user.role !== this.profileForm.get('role')?.value,
			passwordChanged: this.profileForm.get('password')?.value !== '',
			password2Changed: this.profileForm.get('password2')?.value !== '',
		};
		return Object.values(valueChanges).some((value) => value);
	}
}
