import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/settings/modal.service';
import { Hospital } from '../../shared/models/mongo-models/hospital.model';
import { SweetAlertService } from '../../shared/services/helpers/sweet-alert.service';
import { isHospital } from '../../shared/helpers/models.helpers';
import { HospitalsService } from '../../shared/services/http/models/hospitals.service';
import { DoctorsService } from '../../shared/services/http/models/doctors.service';
import { Doctor } from '../../shared/models/mongo-models/doctor.model';

@Component({
	selector: 'app-doctors-of-hospital-modal',
	templateUrl: './doctors-of-hospital-modal.component.html',
	styleUrls: ['./doctors-of-hospital-modal.component.css'],
})
export class DoctorsOfHospitalModalComponent {
	// ANCHOR : Variables
	public data!: Hospital;

	public doctorsOfHospital: any[] = [];

	public areDoctorsChanged : boolean = false;

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
	}

	// ANCHOR : Methods

	/**
	 * ? Obtiene los doctores del hospital
	 * @public
	 */
	public _getDoctorsOfHospital() {
		this._hospitalsSvc
			.getDoctors(this.data.id)
			.subscribe((res) => {
				const {data:doctors} = res;
				if(!res || !doctors) {
					this._sweerAlertSvc.alertError('Some error ocurred getting doctors of hospital');
					this.close();
					return;
				}
				this.doctorsOfHospital = doctors.map((doctor) => new Doctor(doctor));
				console.log(res);
			});
	}


	/**
	 * ? Obtiene los doctores sin hospital
	 * @public
	 */
	public _getDoctorsWithoutHospital() {
		// TODO
		this._doctorsSvc.getByQuery({  }).subscribe((res) => {
			console.log(res);
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
