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

	public array1 = [
		{ id: 1, name: 'John' },
		{ id: 2, name: 'Doe' },
		{ id: 3, name: 'Jane' },
		{ id: 4, name: 'Pepe' },
		{ id: 5, name: 'Juan' },
		{ id: 6, name: 'Pablo' },
		{ id: 7, name: 'Pedro' },
		{ id: 8, name: 'Pepito' },
		{ id: 9, name: 'Pepa' },
		{ id: 10, name: 'Pepita' },
		{ id: 11, name: 'Pepin' },
		{ id: 12, name: 'Pepinillo' },
		{ id: 13, name: 'Anibal' },
		{ id: 14, name: 'Anibalito' },
		{ id: 15, name: 'Anibalina' },
	];
	public array1Filtered = this.array1.map((item) => item);

	public array2 = [
		{ id: 1, name: 'Urraca' },
		{ id: 2, name: 'Urracita' },
		{ id: 3, name: 'Urracito' },
		{ id: 4, name: 'Urracina' },
		{ id: 5, name: 'Teruel' },
		{ id: 6, name: 'Teruelita' },
		{ id: 7, name: 'Teruelito' },
	];
	public array2Filtered = this.array2.map((item) => item);

	public relation: Record<fromTo, { id: number; name: string }[]> = {
		'without-hospital': this.array1,
		'of-hospital': this.array2,
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
				this.doctorsOfHospitalFiltered = this.doctorsOfHospital.map(
					(doctor) => new Doctor(doctor)
				);
				console.log(
					'❗this._hospitalsSvc.getDoctors  ➽ doctorsOfHospital ➽ ⏩',
					this.doctorsOfHospital
				);
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
				this.doctorsWithoutHospitalFiltered =
					this.doctorsWithoutHospital.map((doctor) => new Doctor(doctor));
				console.log(
					'❗this._doctorsSvc.getByQuery  ➽ doctorsWithoutHospital ➽ ⏩',
					this.doctorsWithoutHospital
				);
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
		this.array1Filtered = this.array1.filter((item) =>
			item.name.toLowerCase().includes(text.toLowerCase())
		);
		this.array2Filtered = this.array2.filter((item) =>
			item.name.toLowerCase().includes(text.toLowerCase())
		);
	}

	// private _reloadFiltered(): void {
	// 	this.array1Filtered = this.array1.map((item) => item);
	// 	this.array2Filtered = this.array2.map((item) => item);
	// }

	/**
	 * ? Elemento que se esta arrastrando
	 * @public
	 * @param {DragEvent} event
	 */
	public onDragStart(
		event: DragEvent,
		data: { id: number; name: string },
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
		const { from, ...doctor } = JSON.parse(stringObject);
		console.log('❗onDrop  ➽ from ➽ ⏩', from);
		if (from === destination) return;
		if (destination === 'of-hospital') {
			this.array2.push(doctor);
			this.array1 = this.array1.filter(
				(doctorOrigin) => doctorOrigin.id !== doctor.id
			);
		} else {
			this.array1.push(doctor);
			this.array2 = this.array2.filter(
				(doctorOrigin) => doctorOrigin.id !== doctor.id
			);
		}
		this.search(this.inputSearch.nativeElement.value);
	}
}
