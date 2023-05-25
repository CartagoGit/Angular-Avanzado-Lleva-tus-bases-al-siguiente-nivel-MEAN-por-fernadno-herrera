import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Signal,
	ViewChild,
	WritableSignal,
	computed,
	effect,
	signal,
} from '@angular/core';
import { FileModel } from '../../shared/models/common/file-model';
import {
	Doctor,
	DoctorProps,
} from '../../shared/models/mongo-models/doctor.model';
import { isDoctor } from '../../shared/helpers/models.helpers';
import { User } from '../../shared/models/mongo-models/user.model';
import { Hospital } from '../../shared/models/mongo-models/hospital.model';
import { pathNoImage } from '../../shared/constants/strings.constants';
import { ModalService } from '../../shared/services/settings/modal.service';
import { DoctorSignalsService } from '../../pages/support/doctors/services/doctor-signals.service';
import { HospitalsService } from '../../shared/services/http/models/hospitals.service';
import { UsersService } from '../../shared/services/http/models/users.service';
import {
	Subscription,
	debounceTime,
	distinctUntilChanged,
	filter,
	fromEvent,
	map,
	of,
	switchMap,
} from 'rxjs';
import { DefaultErrorResponse } from '../../shared/interfaces/http/response.interfaces';
import { SweetAlertService } from '../../shared/services/helpers/sweet-alert.service';
import { DoctorsService } from '../../shared/services/http/models/doctors.service';
import { BaseModelsProps } from '../../shared/models/mongo-models/adds/base-models.model';
import { FilesService } from '../../shared/services/http/files.service';

@Component({
	selector: 'app-doctor-modal',
	templateUrl: './doctor-modal.component.html',
	styleUrls: ['./doctor-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorModalComponent {
	// * Vamos a realizar este ejercicio con signals
	// ANCHOR : Variables
	@ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
	public fullHospitals: Hospital[] = [];
	public imageSelected = signal(new FileModel());
	public images = signal<FileModel[]>([]);
	public hospitalsSelected: WritableSignal<Hospital[]> = signal([]);
	public userSelected: WritableSignal<User | undefined> = signal(undefined);
	public userOptions = signal<User[]>([]);
	public userInputFocused = signal(false);
	public hospitalsUnselected = computed(() => {
		const hospitalsSelected = this.hospitalsSelected();
		return this.fullHospitals.filter(
			(hospital) =>
				!hospitalsSelected.some((selected) => selected.id === hospital.id)
		);
	});
	public defaultImage = pathNoImage;
	public kindModal: 'create' | 'update' = 'create';

	private _subscriptions: Subscription[] = [];

	public form: Signal<
		Partial<Omit<Doctor, keyof BaseModelsProps | 'images'>>
	> = computed(() => {
		return {
			user: this.userSelected(),
			hospitals: this.hospitalsSelected(),
			patients: [],
		};
	});

	// TODO : Validar que el usuario no sea ya un doctor
	public errors = computed(() => {
		return {
			user: {
				isError: this.userSelected() === undefined,
				message: 'User is required',
			},
			hospitals: {
				isError: this.hospitalsSelected().length === 0,
				message: 'Doctor must work in some hospital',
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
		private _hospitalSvc: HospitalsService,
		private _doctorSvc: DoctorsService,
		private _usersSvc: UsersService,
		private _filesSvc: FilesService,
		private _sweetAlertSvc: SweetAlertService
	) {
		//* Focusea el input si se cargan usuarios en el desplegable
		//* Para hacer focus cuando se elimina el usuario seleccionado
		effect(
			() => {
				if (this.userOptions().length > 0)
					this.userInput.nativeElement.focus();
			},
			{ allowSignalWrites: true }
		);
	}

	ngOnInit(): void {
		this.getHospitals();
		//* Si llegan datos, es porque es un update
		this.kindModal = this.data ? 'update' : 'create';
	}

	ngAfterViewInit(): void {
		const subUserInput = fromEvent(this.userInput.nativeElement, 'input')
			.pipe(debounceTime(300), distinctUntilChanged())
			.subscribe({
				next: (event) => {
					const text = (event.target as HTMLInputElement)?.value || '';
					this.getUsers(text);
				},
			});

		this._subscriptions.push(subUserInput);
	}

	ngOnDestroy(): void {
		this._subscriptions.forEach((sub) => !sub.closed && sub.unsubscribe());
	}
	// ANCHOR : Methods

	/**
	 * ? Busca usuarios por nombre y devuelve 5 resultados
	 * @public
	 */
	public getUsers(text: string): void {
		if (text.trim().length === 0) {
			this.userOptions.set([]);
			return;
		}
		this._doctorSvc
			.getAll()
			.pipe(
				switchMap((resp) => {
					const { data: doctors } = resp;
					return this._usersSvc
						.getByQuery(
							{ name: text, email: text },
							{
								include: true,
								limit: 5,
								pagination: true,
								page: 1,
								someQuery: true,
							}
						)
						.pipe(
							map((resp) => {
								const { data: users } = resp;
								if (!users) return { data: [] };
								return {
									data: users.filter(
										(user) =>
											!doctors?.some(
												(doctor) => doctor.user.id === user.id
											)
									),
								};
							})
						);
				})
			)
			.subscribe({
				next: (resp) => {
					const { data: users } = resp;
					this.userOptions.set(users || []);
				},
				error: (error: DefaultErrorResponse) => {
					this._sweetAlertSvc.alertError(error.error_message);
				},
			});
	}

	/**
	 * ? Recupera todos los hospitales
	 * @public
	 */
	public getHospitals(): void {
		this._hospitalSvc.getAll().subscribe({
			next: (resp) => {
				const { data: hospitals } = resp;
				this.fullHospitals = hospitals || [];

				if (!this.data || !isDoctor(this.data)) {
					this.hospitalsSelected.set([]);
					return;
				}
				const {
					user,
					hospitals: hospitalsFromDoctor,
					dataImages,
				} = this.data;
				this.defaultImage = dataImages?.defaultImgSrc || pathNoImage;
				this.hospitalsSelected.set(hospitalsFromDoctor);
				this.userSelected.set(user);
			},
			error: (error: DefaultErrorResponse) => {
				this._sweetAlertSvc.alertError(error.error_message);
			},
		});
	}

	/**
	 * ? Método para crear un doctor
	 * @public
	 */
	public createDoctor(): void {
		if (!this.isFormValid()) return;
		this._doctorSvc
			.post(this.form())
			.pipe(
				switchMap((resp) => {
					const { model } = resp;
					if (!resp || !model) throw 'Could not create the doctor';
					if (!this.images() || !this.images().length) return of(resp);
					return this._filesSvc
						.uploadFile(
							{
								filesToUpload: this.images().map((img) => img.file!),
								id: model.id,
								typeFile: 'images',
								typeModel: 'doctors',
							},
							{ replaceAll: true }
						)
						.pipe(map(() => resp));
				})
			)
			.subscribe({
				next: (resp) => {
					const { model } = resp;
					this._sweetAlertSvc.alertSuccess('Doctor created successfully');
					this.close(model);
				},
				error: (error: DefaultErrorResponse) => {
					this._sweetAlertSvc.alertError(error.error_message);
				},
			});
	}

	/**
	 * ? Método para actualizar un doctor
	 * @public
	 */
	public updateDoctor(): void {
		if (!this.isFormValid()) return;
		this._doctorSvc
			.put({ ...this.form(), id: this.data!.id })
			.pipe(
				switchMap((resp) => {
					const { data } = resp;
					if (!resp || !data) throw 'Could not update the doctor';
					if (!this.images() || !this.images().length) return of(resp);
					return this._filesSvc
						.uploadFile(
							{
								filesToUpload: this.images().map((img) => img.file!),
								id: data.id,
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
					const { data } = resp;
					this._sweetAlertSvc.alertSuccess('Doctor updated successfully');
					this.close(data);
				},
				error: (err: DefaultErrorResponse) => {
					this._sweetAlertSvc.alertError(err.error_message);
				},
			});
	}

	/**
	 * ? Evento cuando la imagen cambia en el input file
	 * @public
	 */
	public imageChanged(image: FileModel) {
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

	/**
	 * ? Selecciona un usuario del desplegable de usuarios
	 * @public
	 * @param {User} user
	 */
	public selectUser(user: User): void {
		this.userSelected.set(user);
		this.userInput.nativeElement.value = user.name;
		this.userInputFocused.set(false);
		this.userOptions.set([]);
	}

	/**
	 * ? Evento cuando el usuario hace click fuera del input de usuario
	 * @public
	 * @param {FocusEvent} event
	 * @param {HTMLDivElement} div
	 */
	public onBlurUserInput(event: FocusEvent, div: HTMLDivElement): void {
		if (div.contains(event.relatedTarget as Node)) return;
		this.userInputFocused.set(false);
	}

	/**
	 * ? Evento cuando el usuario hace focus en el input de usuario
	 * @public
	 * @param {FocusEvent} event
	 * @param {HTMLDivElement} div
	 */
	public onFocusUserInput(event: FocusEvent, div: HTMLDivElement): void {
		if (div.contains(event.relatedTarget as Node)) return;
		this.userInputFocused.set(true);
	}

	/**
	 * ? Elimina el usuario seleccionado
	 * @public
	 * @param {HTMLInputElement} userInput
	 */
	public removeUser(userInput: HTMLInputElement): void {
		this.userSelected.set(undefined);
		this.getUsers(userInput.value);
	}
}
