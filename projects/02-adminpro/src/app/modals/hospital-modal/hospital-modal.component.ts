import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../shared/services/settings/modal.service';
import { pathNoImage } from '../../shared/constants/strings.constants';
import { FileModel } from '../../shared/models/common/file-model';
import {
	Hospital,
	HospitalProps,
} from '../../shared/models/mongo-models/hospital.model';
import { HospitalsService } from '../../shared/services/http/models/hospitals.service';
import { BaseModelsProps } from '../../shared/models/mongo-models/adds/base-models.model';
import { SweetAlertService } from '../../shared/services/helpers/sweet-alert.service';
import { DefaultErrorResponse } from '../../shared/interfaces/http/response.interfaces';
import { map, of, switchMap } from 'rxjs';
import { FilesService } from '../../shared/services/http/files.service';
import { isHospital } from '../../shared/helpers/models.helpers';

@Component({
	selector: 'app-hospital-modal',
	templateUrl: './hospital-modal.component.html',
	styleUrls: ['./hospital-modal.component.css'],
})
export class HospitalModalComponent {
	// ANCHOR : Variables
	public hospitalForm = this._fb.group({
		name: ['', Validators.required],
		address: ['', Validators.required],
		images: [[] as FileModel[]],
		phone: [''],
	});
	public image = new FileModel();
	public defaultImage = pathNoImage;
	public data?: Hospital;
	public kindModal: 'create' | 'update' = 'create';

	// ANCHOR : Constructor
	constructor(
		private _fb: FormBuilder,
		private _modalSvc: ModalService,
		private _filesSvc: FilesService,
		private _hospitalSvc: HospitalsService,
		private _sweetAlertSvc: SweetAlertService
	) {}

	ngOnInit(): void {
		//* Si llegan datos, es porque es un update
		console.log("❗ngOnInit  ➽ data ➽ ⏩" , this.data);
		if (this.data && isHospital(this.data)) {
			this.kindModal = 'update';
			const { address, name, phone, dataImages } = this.data;
			this.defaultImage = dataImages?.defaultImgSrc || pathNoImage;
			this.hospitalForm.patchValue({
				address,
				name,
				phone,
			});
		}
	}

	// ANCHOR : Methods

	/**
	 * ? Crea un nuevo hospital
	 * @public
	 */
	public createHospital() {
		if (this.hospitalForm.invalid) return;
		const { address, name, phone, images } = this.hospitalForm.value;
		const hospitalParams: Omit<
			HospitalProps,
			keyof BaseModelsProps | 'images'
		> = {
			address: address!,
			name: name!,
			phone: phone || undefined,
		};
		this._hospitalSvc
			.post(hospitalParams)
			.pipe(
				switchMap((resp) => {
					const { model } = resp;
					if (!resp || !model) throw 'Could not create the hospital';
					if (!images || !images.length) return of(resp);
					return this._filesSvc
						.uploadFile(
							{
								filesToUpload: images.map((img) => img.file!),
								id: model.id,
								typeFile: 'images',
								typeModel: 'hospitals',
							},
							{ replaceAll: true }
						)
						.pipe(map(() => resp));
				})
			)
			.subscribe({
				next: (resp) => {
					const { model } = resp;
					this._sweetAlertSvc.alertSuccess(
						'Hospital created successfully'
					);
					this.close(model);
				},
				error: (err: DefaultErrorResponse) => {
					this._sweetAlertSvc.alertError(err.error_message);
				},
			});
	}

	/**
	 * ? Actualiza un hospital
	 * @public
	 */
	public updateHospital() {
		if (this.hospitalForm.invalid) return;
		const { address, name, phone, images } = this.hospitalForm.value;
		const hospitalParams: Omit<
			HospitalProps,
			keyof BaseModelsProps | 'images'
		> = { address: address!, name: name!, phone: phone || undefined };
		this._hospitalSvc
			.put({ ...hospitalParams, id: this.data!.id })
			.pipe(
				switchMap((resp) => {
					const { model } = resp;
					if (!resp || !model) throw 'Could not update the hospital';
					if (!images || !images.length) return of(resp);
					return this._filesSvc
						.uploadFile(
							{
								filesToUpload: images.map((img) => img.file!),
								id: model.id,
								typeFile: 'images',
								typeModel: 'hospitals',
							},
							{ replaceAll: true }
						)
						.pipe(map(() => resp));
				})
			)
			.subscribe({
				next: (resp) => {
					const { model } = resp;
					this._sweetAlertSvc.alertSuccess(
						'Hospital updated successfully'
					);
					this.close(model);
				},
				error: (err: DefaultErrorResponse) => {
					this._sweetAlertSvc.alertError(err.error_message);
				},
			});
	}

	/**
	 * ? Cierra el modal
	 * @public
	 */
	public close(data?: Hospital) {
		const response = !!data ? { data, isOk: true } : { isOk: false };
		this._modalSvc.close(response);
	}

	/**
	 * ? Evento cuando la imagen cambia en el input file
	 * @public
	 */
	public imageChanged(image: FileModel) {
		this.hospitalForm.get('images')?.setValue([image]);
	}
}
