import {
	Component,
	ElementRef,
	ViewChild,
	WritableSignal,
	computed,
	signal,
} from '@angular/core';
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
import { UsersService } from '../../shared/services/http/models/users.service';
import {
	Subscription,
	debounceTime,
	distinctUntilChanged,
	fromEvent,
} from 'rxjs';

@Component({
	selector: 'app-doctor-modal',
	templateUrl: './doctor-modal.component.html',
	styleUrls: ['./doctor-modal.component.scss'],
})
export class DoctorModalComponent {
	// * Vamos a realizar este ejercicio con signals
	// ANCHOR : Variables
	@ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
	public fullHospitals: Hospital[] = [];
	public userShown: User[] = [];
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
		private _usersSvc: UsersService
	) {}

	ngOnInit(): void {
		this.getHospitals();
		//* Si llegan datos, es porque es un update
		this.kindModal = 'update';
	}

	ngAfterViewInit(): void {
		const subUserInput = fromEvent(this.userInput.nativeElement, 'input')
			.pipe(debounceTime(500), distinctUntilChanged())
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
		this._usersSvc
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
			.subscribe((resp) => {
				const { data: users } = resp;
				console.log('❗.subscribe  ➽ resp ➽ ⏩', resp);
				this.userOptions.set(users || []);
			});
	}

	/**
	 * ? Recupera todos los hospitales
	 * @public
	 */
	public getHospitals(): void {
		this._hospitalSvc.getAll().subscribe((resp) => {
			const { data: hospitals } = resp;
			this.fullHospitals = hospitals || [];

			if (!this.data || !isDoctor(this.data)) {
				this.hospitalsSelected.set([]);
				return;
			}
			const { user, hospitals: hospitalsFromDoctor, dataImages } = this.data;
			this.defaultImage = dataImages?.defaultImgSrc || pathNoImage;
			this.hospitalsSelected.set(hospitalsFromDoctor);
			this.userSelected.set(user);
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

	// TODO arreglar para arreglar la apertura y cierre del desplegable
	public onBlur(event: FocusEvent, div: HTMLDivElement): void {
		if (div.contains(event.relatedTarget as Node)) return;
		this.userInputFocused.set(false);
	}

	public onFocus(event: FocusEvent, div: HTMLDivElement): void {
		if (div.contains(event.relatedTarget as Node)) return;
		this.userInputFocused.set(true);
	}

	public removeUser(userInput: HTMLInputElement): void {
		this.userSelected.set(undefined);
		this.getUsers(userInput.value);
		userInput.focus();
	}
}
