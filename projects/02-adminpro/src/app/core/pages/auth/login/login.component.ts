import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'projects/02-adminpro/src/app/shared/services/settings/storage.service';
import { Subscription } from 'rxjs';
import { ValidatorService } from '../../../../shared/services/helpers/validator.service';
import { AuthService } from '../../../../shared/services/http/auth.service';
import { AuthDefaultResponse } from '../../../../shared/services/http/interfaces/request.interface';
import { DefaultErrorResponse } from '../../../../shared/services/http/interfaces/response.interfaces';
import { SweetAlertService } from '../../../../shared/services/helpers/sweet-alert.service';

//* Tipo de dato a recuperar del localstorage cuando se pulsa el boton de recordar
type RembemberUser =
	| {
			email: string;
			remember: boolean;
	  }
	| undefined;

/**
 * ? Respuesta desde Google al pasarle el cliente id para recuperar el credencial
 * @interface CredentialResponse
 * @typedef {CredentialResponse}
 */
interface CredentialResponse {
	credential: string;
	select_by: string;
}

@Component({
	selector: 'auth-login',
	templateUrl: './login.component.html',
	styleUrls: ['../auth.css'],
})
export class LoginComponent {
	// ANCHOR : variables
	@ViewChild('googleBtn') googleBtnRef!: ElementRef;
	private _googleBtnHtml!: HTMLDivElement;

	public needRecover = false;
	public formSubmitted = false;
	public showPassword = false;

	public msgErrors = {
		email: '',
		password: '',
	};

	public loginForm = this._fb.group({
		email: ['', [Validators.required, Validators.email]],
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

		//* Recuperamos los datos del storage en caso de que lo hayamos  guardado con el boton de recordar
		const remembered = this._storage.get(
			'userRemember',
			'object'
		) as RembemberUser;
		if (!!remembered) {
			this.loginForm.get('email')?.setValue(remembered.email);
			this.loginForm.get('remember')?.setValue(remembered.remember);
		}
	}

	ngAfterViewInit(): void {
		this._googleBtnHtml = this.googleBtnRef.nativeElement;
		this._getGoogleClientId();
	}

	ngOnDestroy(): void {
		this._subForm.unsubscribe();
	}

	// ANCHOR : Métodos

	/**
	 * ? Realiza la subscripcion http para loguearse
	 * @public
	 */
	public login() {
		this.formSubmitted = true;

		if (this.loginForm.invalid) return;
		const body: AuthDefaultResponse = {
			password: this.loginForm.get('password')?.value!,
			email: this.loginForm.get('email')?.value!,
		};
		this._authSvc.login(body).subscribe({
			next: (resp) => {
				if (!resp) return;
				this._storage.set('token', resp.token);
				if (this.loginForm.get('remember')?.value === true) {
					this._storage.set('userRemember', {
						email: this.loginForm.get('email')?.value,
						remember: true,
					});
				} else {
					this._storage.delete('userRemember');
				}
			},
			error: (error: DefaultErrorResponse) => {
				console.error(error);
				this._storage.delete('token');
				this._validatorSvc.renewMsgErrors(this.loginForm, this.msgErrors);

				if (error?.error_data?.reason === 'email or password incorrect') {
					const error = { emailOrPassCorrect: false };
					this.loginForm.get('email')?.setErrors(error);
					this.loginForm.get('password')?.setErrors(error);
				} else this._sweetAlert.alertError('You cannot Sign in');
			},
		});

		// this._router.navigate(['/']);
	}

	/**
	 * ? Recupera el id del cliente que es publico, desde la api
	 * @private
	 */
	private _getGoogleClientId() {
		this._authSvc.googleClientId().subscribe({
			next: (resp) => {
				if (!resp) return;
				const googleClientId = resp.data!;
				this._initGoogleLogin(googleClientId);
			},
			error: (error) => {
				this._sweetAlert.alertError('Getting Google Client ID from Api');
				console.error(error);
			},
		});
	}

	/**
	 * ? Crea la instancia del boton y inicializa el servicio con google
	 * @private
	 * @param {string} clientGoogleId
	 */
	private _initGoogleLogin(clientGoogleId: string) {
		google.accounts.id.initialize({
			//* Recupera el id del cliente de google desde la api
			client_id: clientGoogleId,

			callback: this._handleCredentialResponse,
		});
		google.accounts.id.renderButton(
			this._googleBtnHtml,
			{ theme: 'outline', size: 'large', type: 'standard' } // customization attributes
		);
	}

	/**
	 * ? Manejador de la respuesta y los credenciales para autenticarse con google identify
	 * @private
	 * @param {CredentialResponse} response
	 */
	private _handleCredentialResponse(response: CredentialResponse) {
		console.log('❗_handleCredentialResponse  ➽ response ➽ ⏩', response);

		var urlGoogleLogin = 'http://localhost:5000/api/auth/google-login';
				// console.log('Encoded JWT ID token: ' + response.credential);
				fetch(urlGoogleLogin, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ token: response.credential }),
				})
					.then((resp) => resp.json())
					.then(
						(data) => data
						// console.log('ServerData', data)
					)
					.catch(console.error);
		// this._authSvc.googleLogin(response.credential).subscribe({
		// 	next: (resp) => {
		// 		console.log(resp);
		// 	},
		// 	error: (error) => {
		// 		this._sweetAlert.alertError('Log in with Google Identify');
		// 		console.error(error);
		// 	},
		// });
	}
}
