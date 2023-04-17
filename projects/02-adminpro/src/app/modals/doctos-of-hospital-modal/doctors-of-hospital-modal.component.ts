import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/settings/modal.service';
import { Hospital } from '../../shared/models/mongo-models/hospital.model';
import { SweetAlertService } from '../../shared/services/helpers/sweet-alert.service';
import { isHospital } from '../../shared/helpers/models.helpers';
import { HospitalsService } from '../../shared/services/http/models/hospitals.service';
import { DoctorsService } from '../../shared/services/http/models/doctors.service';
import { Doctor } from '../../shared/models/mongo-models/doctor.model';
import { DefaultErrorResponse } from '../../shared/interfaces/http/response.interfaces';

@Component({
	selector: 'app-doctors-of-hospital-modal',
	templateUrl: './doctors-of-hospital-modal.component.html',
	styleUrls: ['./doctors-of-hospital-modal.component.css'],
})
export class DoctorsOfHospitalModalComponent {
	// ANCHOR : Variables
	public data!: Hospital;

	public doctorsOfHospital: Doctor[] = [];
	public doctorsWithoutHospital: Doctor[] = [];

	public areDoctorsChanged: boolean = false;

	// ANCHOR : Constructor
	constructor(
		private _modalSvc: ModalService,
		private _sweerAlertSvc: SweetAlertService,
		private _doctorsSvc: DoctorsService,
		private _hospitalsSvc: HospitalsService
	) {}

	ngOnInit(): void {
		if (!this.data || !isHospital(this.data)) {
			this._sweerAlertSvc.alertError(
				'This modal need a data hospital to work'
			);
			this.close();
		}
		this._getDoctorsOfHospital();
		this._getDoctorsWithoutHospital();
	}

	// ANCHOR : Methods

	/**
	 * ? Obtiene los doctores del hospital
	 * @public
	 */
	public _getDoctorsOfHospital() {
		this._hospitalsSvc.getDoctors(this.data.id).subscribe({
			next: (res) => {
				const { data: doctors } = res;
				if (!res || !doctors) {
					this._sweerAlertSvc.alertError(
						'Some error ocurred getting doctors of hospital'
					);
					this.close();
					return;
				}
				this.doctorsOfHospital = doctors.map(
					(doctor) => new Doctor(doctor)
				);
				console.log("❗this._hospitalsSvc.getDoctors  ➽ doctorsOfHospital ➽ ⏩" , this.doctorsOfHospital);
			},
			error: (error: DefaultErrorResponse) => {
				this._sweerAlertSvc.alertError(error.error_message);
				this.close();
			},
		});
	}

	/**
	 * ? Obtiene los doctores sin hospital
	 * @public
	 */
	public _getDoctorsWithoutHospital() {
		this._doctorsSvc.getByQuery({ hospitals: [] }).subscribe({
			next: (res) => {
				const { data: doctors } = res;
				if (!res || !doctors) {
					this._sweerAlertSvc.alertError(
						'Some error ocurred getting doctors without hospital'
					);
					this.close();
					return;
				}
				this.doctorsWithoutHospital = doctors.map(
					(doctor) => new Doctor(doctor)
				);
				console.log("❗this._doctorsSvc.getByQuery  ➽ doctorsWithoutHospital ➽ ⏩" , this.doctorsWithoutHospital);
			},
			error: (error: DefaultErrorResponse) => {
				this._sweerAlertSvc.alertError(error.error_message);
				this.close();
			},
		});
	}

	/**
	 * ? Cierra el modal
	 * @public
	 */
	public close() {
		this._modalSvc.close();
	}

	public updateHospital() {
		// TODO
		console.log(this.doctorsOfHospital);
	}
}
