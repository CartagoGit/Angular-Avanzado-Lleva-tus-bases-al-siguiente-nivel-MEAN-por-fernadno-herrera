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
	public fullHospitals: Hospital[] = [];
	public userShown: User[] = [];
	public imageSelected = signal(new FileModel());
	public images = signal<FileModel[]>([]);
	public hospitalsSelected: WritableSignal<Hospital[]> = signal([]);
	public userSelected: WritableSignal<User | undefined> = signal(undefined);
	public hospitalsUnselected = computed(() => {
		const hospitalsSelected = this.hospitalsSelected();
		return this.fullHospitals.filter(
			(hospital) =>
				!hospitalsSelected.some((selected) => selected.id === hospital.id)
		);
	});
	public defaultImage = pathNoImage;
	public kindModal: 'create' | 'update' = 'create';

	public form = computed(() => {
		return {
			user: this.userSelected(),
			hospitals: this.hospitalsSelected(),
			images: this.images(),
		};
	});

	public errors = computed(() => {
		return {
			user: {
				isError: this.userSelected() === undefined,
				message: 'User is required',
			},
			hospitals: {
				isError: this.hospitalsSelected().length === 0,
				message: 'Some hospital is required',
			},
		};
	});

	public isFormValid = computed(() => {
		const errors = this.errors();
		return !Object.values(errors).some((error) => error.isError);
	});

	public readonly data?: Doctor = undefined;

	// ANCHOR : Constructor
	constructor(
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
		this.hospitalsSelected.set(hospitals);
		this.userSelected.set(user);
	}

	// ANCHOR : Methods
	public getUsers(): void {}

	/**
	 * ? Recupera todos los hospitales
	 * @public
	 */
	public getHospitals(): void {
		this._hospitalSvc.getAll().subscribe((resp) => {
			const { data: hospitals } = resp;
			this.fullHospitals = hospitals || [];

			if (!this.data) this.hospitalsSelected.set([]);
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
		this.images.set([image]);
	}

	/**
	 * ? Cierra el modal
	 * @public
	 */
	public close(data?: Doctor) {
		this._doctorSignals.closeModal.update((current) => {
			return !!data
				? { success: true, data }
				: { ...current, success: false };
		});
		this._modalSvc.close();
	}

	/**
	 * ? Agrega un hospital a la lista de hospitales seleccionados
	 * @public
	 * @param {string} idHospital
	 */
	public addHospital(idHospital: string): void {
		this.hospitalsSelected.update((current) => {
			const hospital = this.fullHospitals.find(
				(hospital) => hospital.id === idHospital
			);
			if (!hospital) return current;
			return [...current, hospital];
		});
	}

	/**
	 * ? Elimina un hospital de la lista de hospitales seleccionados
	 * @public
	 * @param {string} hospitalId
	 */
	public clickRemoveHospital(hospitalId: string): void {
		this.hospitalsSelected.update((current) => {
			return current.filter((hospital) => hospital.id !== hospitalId);
		});
	}
}
