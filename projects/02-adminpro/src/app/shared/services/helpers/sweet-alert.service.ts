import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { StateService } from '../settings/state.service';

@Injectable({
	providedIn: 'root',
})
export class SweetAlertService {
	constructor(private _stateSvc: StateService) {}

	/**
	 * ? Crea una alerta de error prefefinida con sweet alert
	 * @public
	 * @param {string} [errorMsg='']
	 */
	public alertError(errorMsg: string = ''): void {
		if (this._stateSvc.isMaintenance) {
			this.alertMaintenance()
			return;
		}

		Swal.fire(
			'Error',
			`${
				!!errorMsg ? errorMsg + '. ' : ''
			}An error occurred. Contact with your administrator`,
			'error'
		);
	}

	public alertMaintenance(): void {
		Swal.fire(
			'In maintenance',
			`We are in maintenance. Wait, we will come soon again`,
			'info'
		);
	}
}
