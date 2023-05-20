import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../shared/models/common/file-model';
import { Doctor } from '../../shared/models/mongo-models/doctor.model';
import { isDoctor } from '../../shared/helpers/models.helpers';
import { User } from '../../shared/models/mongo-models/user.model';
import { Hospital } from '../../shared/models/mongo-models/hospital.model';
import { pathNoImage } from '../../shared/constants/strings.constants';
import { ModalService } from '../../shared/services/settings/modal.service';
import { DoctorSignalsService } from '../../pages/support/doctors/services/doctor-signals.service';

@Component({
	selector: 'app-doctor-modal',
	templateUrl: './doctor-modal.component.html',
	styleUrls: ['./doctor-modal.component.scss'],
})
export class DoctorModalComponent {
	// ANCHOR : Variables
	public doctorForm = this._fb.group({
		// user: [undefined as User | undefined, Validators.required],
		user: [undefined as User | undefined],
		// hospitals: [
		// 	[] as Hospital[],
		// 	[Validators.required, Validators.minLength(1)],
		// ],
		hospitals: [[] as string[]],
		patients: [[] as User[]],
		images: [[] as FileModel[]],
	});
	public image = new FileModel();
	public defaultImage = pathNoImage;
	public kindModal: 'create' | 'update' = 'create';

	public data?: Doctor;

	// ANCHOR : Constructor
	constructor(
		private _fb: FormBuilder,
		private _modalSvc: ModalService,
		private _doctorSignals: DoctorSignalsService
	) {}

	ngOnInit(): void {
		//* Si llegan datos, es porque es un update
		if (!this.data || !isDoctor(this.data)) return;
		this.kindModal = 'update';
		const { user, hospitals, dataImages } = this.data;
		this.defaultImage = dataImages?.defaultImgSrc || pathNoImage;
		this.doctorForm.patchValue({
			// hospitals,
			user,
		});
	}

	// ANCHOR : Methods

	/**
	 * ? Método para crear un doctor
	 * @public
	 */
	public createDoctor(): void {}

	/**
	 * ? Método para actualizar un doctor
	 * @public
	 */
	public updateDoctor(): void {}

	/**
	 * ? Evento cuando la imagen cambia en el input file
	 * @public
	 */
	public imageChanged(image: FileModel) {
		this.doctorForm.get('images')?.setValue([image]);
	}

	/**
	 * ? Cierra el modal
	 * @public
	 */
	public close(data?: Doctor) {
		// const response = !!data ? { data, isOk: true } : { isOk: false };
		this._doctorSignals.closeModal.update((current) => {
			return !!data
				? { success: true, data }
				: { ...current, success: false };
		});
		this._modalSvc.close();
	}

	public addHospital(text: string): void {
		// TODO cambiar
		this.doctorForm.controls.hospitals.value?.push(text);
	}

	public clickRemoveHospital(data: { hospital: string; index: number }): void {
		const { hospital, index } = data;
		this.doctorForm.controls.hospitals.value?.splice(index, 1);
	}
}
