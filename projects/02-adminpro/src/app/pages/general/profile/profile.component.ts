import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../shared/models/mongo-models/user.model';
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

	public profileForm!: FormGroup;

	// ANCHOR : Constructor
	constructor(private _fb: FormBuilder, private _state: StateService) {
		this.user = this._state.user!;
	}

	ngOnInit(): void {
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

	// ANCHOR : Methods
}
