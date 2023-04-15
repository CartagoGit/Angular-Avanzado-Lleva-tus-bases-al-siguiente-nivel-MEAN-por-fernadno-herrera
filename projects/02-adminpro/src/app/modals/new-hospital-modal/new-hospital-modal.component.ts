import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../shared/services/settings/modal.service';

@Component({
	selector: 'app-new-hospital-modal',
	templateUrl: './new-hospital-modal.component.html',
	styleUrls: ['./new-hospital-modal.component.css'],
})
export class NewHospitalModalComponent {
	// ANCHOR : Variables
	public newHospitalForm = this._fb.group({
		name: [''],
		address: [''],
		images: [[]],
	});

	// ANCHOR : Constructor
	constructor(private _fb: FormBuilder, private _modalSvc :ModalService) {}

	// ANCHOR : Methods


	/**
	 * ? Crea un nuevo hospital
	 * @public
	 */
	public createHospital(){

	}


	/**
	 * ? Cierra el modal
	 * @public
	 */
	public close(){
		this._modalSvc.close();
	}
}
