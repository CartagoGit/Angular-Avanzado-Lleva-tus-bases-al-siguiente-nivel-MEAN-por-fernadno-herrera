import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../shared/services/settings/modal.service';
import { pathNoImage } from '../../shared/constants/strings.constants';
import { FileModel } from '../../shared/models/common/file-model';
import { Hospital } from '../../shared/models/mongo-models/hospital.model';

@Component({
	selector: 'app-new-hospital-modal',
	templateUrl: './new-hospital-modal.component.html',
	styleUrls: ['./new-hospital-modal.component.css'],
})
export class NewHospitalModalComponent {
	// ANCHOR : Variables
	public newHospitalForm = this._fb.group({
		name: ['', Validators.required],
		address: ['', Validators.required],
		images: [[]],
		phone: [''],
	});

	public image = new FileModel();

	public defaultImage = pathNoImage;

	// ANCHOR : Constructor
	constructor(private _fb: FormBuilder, private _modalSvc: ModalService, private _cd: ChangeDetectorRef) {}

	// ANCHOR : Methods

	/**
	 * ? Crea un nuevo hospital
	 * @public
	 */
	public createHospital() {
		console.log('entra');
	}

	/**
	 * ? Cierra el modal
	 * @public
	 */
	public close(data?: Hospital) {
		const response ={ data } || { isOk: false };
		this._modalSvc.close(response);
	}


	/**
	 * ? Evento cuando la imagen cambia en el input file
	 * @public
	 */
	public imageChanged(image: FileModel) {
		this.image = image;
		this._cd.detectChanges();
	}


}
