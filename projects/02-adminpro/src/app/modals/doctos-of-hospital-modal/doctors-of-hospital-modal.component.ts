import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from '../../shared/services/settings/modal.service';
import { Hospital } from '../../shared/models/mongo-models/hospital.model';
import { SweetAlertService } from '../../shared/services/helpers/sweet-alert.service';
import { isHospital } from '../../shared/helpers/models.helpers';
import { HospitalsService } from '../../shared/services/http/models/hospitals.service';
import { DoctorsService } from '../../shared/services/http/models/doctors.service';
import { Doctor } from '../../shared/models/mongo-models/doctor.model';
import { DefaultErrorResponse } from '../../shared/interfaces/http/response.interfaces';

//* Tipo para saber de que lista viene el doctor a mover
type fromTo = 'of-hospital' | 'without-hospital';

@Component({
	selector: 'app-doctors-of-hospital-modal',
	templateUrl: './doctors-of-hospital-modal.component.html',
	styleUrls: ['./doctors-of-hospital-modal.component.css'],
})
export class DoctorsOfHospitalModalComponent {
	// ANCHOR : Variables
	@ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>;
	public data!: Hospital;

	public doctorsOfHospital: Doctor[] = [];
	public doctorsOfHospitalFiltered: Doctor[] = [];

	public doctorsWithoutHospital: Doctor[] = [];
	public doctorsWithoutHospitalFiltered: Doctor[] = [];

	public areDoctorsChanged: boolean = false;

	// public array1 = [
	// 	{ id: 1, name: 'John' },
	// 	{ id: 2, name: 'Doe' },
	// 	{ id: 3, name: 'Jane' },
	// 	{ id: 4, name: 'Pepe' },
	// 	{ id: 5, name: 'Juan' },
	// 	{ id: 6, name: 'Pablo' },
	// 	{ id: 7, name: 'Pedro' },
	// 	{ id: 8, name: 'Pepito' },
	// 	{ id: 9, name: 'Pepa' },
	// 	{ id: 10, name: 'Pepita' },
	// 	{ id: 11, name: 'Pepin' },
	// 	{ id: 12, name: 'Pepinillo' },
	// 	{ id: 13, name: 'Anibal' },
	// 	{ id: 14, name: 'Anibalito' },
	// 	{ id: 15, name: 'Anibalina' },
	// ];
	// public array1Filtered = this.array1.map((item) => item);

	// public array2 = [
	// 	{ id: 1, name: 'Urraca' },
	// 	{ id: 2, name: 'Urracita' },
	// 	{ id: 3, name: 'Urracito' },
	// 	{ id: 4, name: 'Urracina' },
	// 	{ id: 5, name: 'Teruel' },
	// 	{ id: 6, name: 'Teruelita' },
	// 	{ id: 7, name: 'Teruelito' },
	// ];
	// public array2Filtered = this.array2.map((item) => item);

	public relation: Record<fromTo, Doctor[]> = {
		'without-hospital': this.doctorsOfHospital,
		'of-hospital': this.doctorsWithoutHospital,
	};

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
		// this._getDoctorsOfHospital();
		this._getDoctorsWithoutHospital();
	}

	// ANCHOR : Methods

	/**
	 * ? Obtiene los doctores del hospital
	 * @public
	 */
	// NOTE: Se comenta ya que por fines educativos vamos a pedir todos los doctores y entonces no es necesario hacer dos consultas con informacion distinta, podemos sacar toda la informacion de una unica consulta
	// public _getDoctorsOfHospital() {
	// 	this._hospitalsSvc.getDoctors(this.data.id).subscribe({
	// 		next: (res) => {
	// 			const { data: doctors } = res;
	// 			if (!res || !doctors) {
	// 				this._sweerAlertSvc.alertError(
	// 					'Some error ocurred getting doctors of hospital'
	// 				);
	// 				this.close();
	// 				return;
	// 			}
	// 			this.doctorsOfHospital = doctors.map(
	// 				(doctor) => new Doctor(doctor)
	// 			);
	// 			this._getDoctorsWithoutHospital();
	// 		},
	// 		error: (error: DefaultErrorResponse) => {
	// 			this._sweerAlertSvc.alertError(error.error_message);
	// 			this.close();
	// 		},
	// 	});
	// }

	/**
	 * ? Obtiene los doctores sin hospital
	 * @public
	 */
	public _getDoctorsWithoutHospital() {
		// NOTE : Se deja asi por fines educativos para no tener que seguir modificando el backend
		// this._doctorsSvc.getByQuery({ hospitals: [] }).subscribe({
		this._doctorsSvc.getAll().subscribe({
			next: (res) => {
				const { data: doctors } = res;
				if (!res || !doctors) {
					this._sweerAlertSvc.alertError(
						'Some error ocurred getting doctors without hospital'
					);
					this.close();
					return;
				}
				// NOTE: Se deja por fines educativos, lo mas correcto seria que el backend devolviera los doctores sin hospital
				// * y no tener que filtrarlos desde el front
				this.doctorsWithoutHospital = doctors
					.filter(
						(doctor) =>
							!doctor.hospitals
								.map((hospital) => hospital.id)
								.includes(this.data.id)
					)
					.map((doctor) => new Doctor(doctor));

				this.doctorsOfHospital = doctors
					.filter((doctor) =>
						doctor.hospitals
							.map((hospital) => hospital.id)
							.includes(this.data.id)
					)
					.map((doctor) => new Doctor(doctor));
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
	public close(): void {
		this._modalSvc.close();
	}

	public updateHospital(): void {
		// TODO
		console.log(this.doctorsOfHospital);
	}

	public search(text: string): void {
		this.doctorsOfHospitalFiltered = this.doctorsOfHospital.filter((doctor) =>
			doctor.user.name.toLowerCase().includes(text.toLowerCase())
		);
		this.doctorsWithoutHospitalFiltered = this.doctorsWithoutHospital.filter(
			(doctor) => doctor.user.name.toLowerCase().includes(text.toLowerCase())
		);
	}

	/**
	 * ? Elemento que se esta arrastrando
	 * @public
	 * @param {DragEvent} event
	 */
	public onDragStart(
		event: DragEvent,
		data: { id: string; name: string },
		from: fromTo
	): void {
		const stringObject = JSON.stringify({ ...data, from });
		event.dataTransfer?.setData('object', stringObject);
	}

	/**
	 * ? Evita el evento por defecto cuando se arrastra un elemento sobre otro
	 * @public
	 * @param {DragEvent} event
	 */
	public onDragOver(event: DragEvent): void {
		event.preventDefault();
	}

	/**
	 * ? Cuando se suelta el elemento arrastrado
	 * @public
	 * @param {DragEvent} event
	 */
	public onDrop(event: DragEvent, data: { destination: fromTo }): void {
		if (!event || !event.target) return;
		const { destination } = data;
		const stringObject = event.dataTransfer?.getData('object')!;
		const { from, ...doctorData } = JSON.parse(stringObject);
		console.log('❗onDrop  ➽ from ➽ ⏩', doctorData);
		if (from === destination) return;
		if (destination === 'of-hospital') {
			const doctor = this.doctorsOfHospital.find(
				(doctorOrigin) => doctorOrigin.id === doctorData.id
			);
			if (!doctor) return;
			this.doctorsWithoutHospital.push(doctor);
			this.doctorsOfHospital = this.doctorsOfHospital.filter(
				(doctorOrigin) => doctorOrigin.id !== doctor.id
			);
		} else {
			const doctor = this.doctorsWithoutHospital.find(
				(doctorOrigin) => doctorOrigin.id === doctorData.id
			);
			if (!doctor) return;
			this.doctorsOfHospital.push(doctor);
			this.doctorsWithoutHospital = this.doctorsWithoutHospital.filter(
				(doctorOrigin) => doctorOrigin.id !== doctor.id
			);
		}
		this.search(this.inputSearch.nativeElement.value);
	}
}
