import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { StateService } from '../settings/state.service';

@Injectable({
	providedIn: 'root',
})
export class SweetAlertService {
	constructor(private _stateSvc: StateService) {}

	public alertSuccess(
		msg: string = ''
	): Promise<SweetAlertResult<any>> | undefined {
		return Swal.fire('Success', `${msg}`, 'success');
	}

	/**
	 * ? Crea una alerta de error prefefinida con sweet alert
	 * @public
	 * @param {string} [errorMsg='']
	 */
	public alertError(
		errorMsg: string = ''
	): Promise<SweetAlertResult<any>> | undefined {
		if (this._stateSvc.isMaintenance) {
			this.alertMaintenance();
			return undefined;
		}

		return Swal.fire(
			'Error',
			`${
				!!errorMsg ? errorMsg + '. ' : ''
			}An error occurred. Contact with your administrator`,
			'error'
		);
	}

	/**
	 * ? Crea una alerta de error prefefinida para cuando la app entra en mantenimiento con sweet alert
	 * @public
	 * @returns {Promise<SweetAlertResult<any>>}
	 */
	public alertMaintenance(): Promise<SweetAlertResult<any>> {
		return Swal.fire(
			'In maintenance',
			`We are in maintenance. Wait, we will come soon again`,
			'info'
		);
	}
}
