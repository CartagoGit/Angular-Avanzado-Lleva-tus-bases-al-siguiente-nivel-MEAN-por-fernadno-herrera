import { Component, WritableSignal, computed, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../shared/models/common/file-model';
import { Doctor } from '../../shared/models/mongo-models/doctor.model';
import { isDoctor } from '../../shared/helpers/models.helpers';
import { User } from '../../shared/models/mongo-models/user.model';
import { Hospital } from '../../shared/models/mongo-models/hospital.model';
import { pathNoImage } from '../../shared/constants/strings.constants';
import { ModalService } from '../../shared/services/settings/modal.service';
import { DoctorSignalsService } from '../../pages/support/doctors/services/doctor-signals.service';
import { HospitalsService } from '../../shared/services/http/models/hospitals.service';

@Component({
	selector: 'app-doctor-modal',
	templateUrl: './doctor-modal.component.html',
	styleUrls: ['./doctor-modal.component.scss'],
})
export class DoctorModalComponent {
	// * Vamos a realizar este ejercicio con signals
	// ANCHOR : Variables
	// public doctorForm = this._fb.group({
	// 	// user: [undefined as User | undefined, Validators.required],
	// 	user: [undefined as User | undefined],
	// 	// hospitals: [
	// 	// 	[] as Hospital[],
	// 	// 	[Validators.required, Validators.minLength(1)],
	// 	// ],
	// 	hospitals: [
	// 		[] as Hospital[],
	// 		[Validators.required, Validators.minLength(1)],
	// 	],
	// 	hospitalsSelected: [[] as string[]],
	// 	patients: [[] as User[]],
	// 	images: [[] as FileModel[]],
	// });
	public fullHospitals: Hospital[] = [];
	public userShown: User[] = [];
	public image = signal(new FileModel());
	public hospitalsSelected: WritableSignal<Hospital[]> = signal([]);
	public userSelected: WritableSignal<User | undefined> = signal(undefined);
	public hospitalsUnselected: WritableSignal<Hospital[]> = signal([]);
	public defaultImage = pathNoImage;
	public kindModal: 'create' | 'update' = 'create';

	public form = computed(() => {
		return {
			user: this.userSelected(),
			hospitals: this.hospitalsSelected(),
			images: this.image(),
		};
	});

	public error = computed(() => {
		return {
			user: this.userSelected() === undefined,
			hospitals: this.hospitalsSelected().length === 0,
		};
	});

	public data?: Doctor;

	// ANCHOR : Constructor
	constructor(
		// private _fb: FormBuilder,
		private _modalSvc: ModalService,
		private _doctorSignals: DoctorSignalsService,
		private _hospitalSvc: HospitalsService
	) {
		this.getHospitals();
	}

	ngOnInit(): void {
		//* Si llegan datos, es porque es un update
		if (!this.data || !isDoctor(this.data)) return;
		this.kindModal = 'update';
		const { user, hospitals, dataImages } = this.data;
		this.defaultImage = dataImages?.defaultImgSrc || pathNoImage;
		
		// this.doctorForm.patchValue({
		// 	// hospitals,
		// 	user,
		// });
	}

	// ANCHOR : Methods
	public getUsers(): void {}

	public getHospitals(): void {
		this._hospitalSvc.getAll().subscribe((resp) => {
			const { data } = resp;

			// this.doctorForm.controls.hospitals.setValue(data || []);
		});
	}

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
		// this.doctorForm.get('images')?.setValue([image]);
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

	public addHospital(idHospital: string): void {
		// const selectedHospital =
		// 	this.doctorForm.controls.hospitals.value?.find(
		// 		(hospital) => hospital.id === idHospital
		// 	) || undefined;
		// // const hospital = select.value as Hospital
		// // TODO cambiar
		// this.doctorForm.controls.hospitalsSelected.value?.push(selectedHospital);
	}

	public clickRemoveHospital(data: {
		hospital: Hospital;
		index: number;
	}): void {
		const { hospital, index } = data;
		// this.doctorForm.controls.hospitals.value?.splice(index, 1);
	}
}
