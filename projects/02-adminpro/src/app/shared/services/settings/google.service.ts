import { ElementRef, Injectable, NgZone } from '@angular/core';
import { first, Observable } from 'rxjs';
import { SweetAlertService } from '../helpers/sweet-alert.service';
import { AuthService } from '../http/auth.service';
import { StateService } from './state.service';

@Injectable({
	providedIn: 'root',
})
export class GoogleService {
	// ANCHOR : variables
	
	//* Observable que se ejecuta cuando se carga el script de google
	public googleScriptLoaded$ = new Observable<boolean>((observer) => {
		window.onload = () => {
			observer.next(!!window.google?.accounts?.id);
			// observer.complete();
		};
	}).pipe(first((loaded) => loaded));

	// ANCHOR : Constructor
	constructor(
		private _authSvc: AuthService,
		private _sweetAlert: SweetAlertService,
		private _stateSvc: StateService,
		private _ngZone: NgZone
	) {}

	/**
	 * ? Recupera y genera todo lo necesario para realizar el boton y el login con google identity
	 * @param googleBtnRef
	 */
	public createGoogleLogin(googleBtnRef: ElementRef) {
		this._catchGoogleClientId(googleBtnRef.nativeElement);
	}

	/**
	 * ? Recupera el id del cliente que es publico, desde la api
	 * @private
	 */
	private _catchGoogleClientId(googleBtnHtml: HTMLDivElement) {
		this._authSvc.googleClientId().subscribe({
			next: (resp) => {
				if (!resp) return;
				const googleClientId = resp.data!;
				this._instanceGoogleLogin(googleClientId, googleBtnHtml);
			},
			error: (error) => {
				console.error(error);
				this._sweetAlert.alertError('Getting Google Client ID from Api');
			},
		});
	}

	/**
	 * ? Crea la instancia del boton y inicializa el servicio con google
	 * @private
	 * @param {string} clientGoogleId
	 * @param {HTMLDivElement} googleBtnHtml
	 */
	private _instanceGoogleLogin(
		clientGoogleId: string,
		googleBtnHtml: HTMLDivElement
	) {
		google.accounts.id.initialize({
			//* Recupera el id del cliente de google desde la api
			client_id: clientGoogleId,
			//* CUIDADO -> Si pasamos el handle como tal la referencia al "this" pasa a ser el objeto de google
			//* Para evitar esto pasamos la funcion como funcion de flecha, y mantenemos la referencia a nuestra clase de angular
			callback: ({ credential }) =>
				this._handleCredentialResponse(credential),
		});
		google.accounts.id.renderButton(
			googleBtnHtml,
			{
				theme: 'outline',
				size: 'large',
				type: 'standard',
				shape: 'pill',
				text: 'signin',
			} // customization attributes
		);
	}

	/**
	 * ? Manejador de la respuesta y los credenciales para autenticarse con google identify
	 * @private
	 * @param {string} credential
	 */
	private _handleCredentialResponse(credential: string) {
		this._authSvc.googleLogin(credential).subscribe({
			next: (resp) => {
				if (!resp) return;
				const { token, model } = resp;

				this._ngZone.run(() =>
					this._stateSvc.login({ token: token!, userProps: model! })
				);
			},
			error: (error) => {
				console.error(error);
				this._stateSvc.logout();
				this._sweetAlert.alertError('Log in with Google Identify');
			},
		});
	}
}
