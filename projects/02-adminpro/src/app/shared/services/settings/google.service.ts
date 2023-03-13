import { ElementRef, Injectable } from '@angular/core';
import { SweetAlertService } from '../helpers/sweet-alert.service';
import { AuthService } from '../http/auth.service';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root',
})
export class GoogleService {
	private _storage;
	constructor(
		private _authSvc: AuthService,
		private _sweetAlert: SweetAlertService,
		private _storageSvc: StorageService
	) {
		this._storage = this._storageSvc.local;
	}

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
			{ theme: 'outline', size: 'large', type: 'standard' } // customization attributes
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
				const { token } = resp;
				this._storage.set('token', token);
			},
			error: (error) => {
				console.error(error);
				this._storage.delete('token');
				this._sweetAlert.alertError('Log in with Google Identify');
			},
		});
	}
}
