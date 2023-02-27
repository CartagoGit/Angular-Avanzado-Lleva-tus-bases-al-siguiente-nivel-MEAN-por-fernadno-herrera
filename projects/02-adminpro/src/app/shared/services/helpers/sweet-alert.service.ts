import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class SweetAlertService {
	constructor() {}

	public alertError(errorMsg: string = '') {
		Swal.fire(
			'Error',
			`${
				!!errorMsg ? errorMsg + '. ' : ''
			}An error occurred. Contact with your administrator`,
			'error'
		);
	}
}
