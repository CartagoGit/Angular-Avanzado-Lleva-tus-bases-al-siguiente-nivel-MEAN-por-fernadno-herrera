import { Injectable, Type } from '@angular/core';
import { createStore } from '../../helpers/store.helper';
import { ModalComponent } from '../../components/modal/modal.component';
import { StoreOptions } from '../../interfaces/models/store.interface';
import { Store } from '../../models/store/store.model';
import { ModalReturnedAtOpen } from '../../interfaces/models/modal.interface';
import {
	ModalOptions,
	ModalState,
} from '../../interfaces/models/modal.interface';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	// ANCHOR : Variables
	public modal!: ModalComponent;
	private readonly _modalStoreOptions: StoreOptions<ModalState> = {
		denyDeepChangesInParams: ['component'],
	};
	public readonly stackStores = createStore<Store<ModalState>[]>([], {
		allowDeepChanges: false,
	});
	get numActiveModals(): number {
		return this._stackModals.length;
	}
	private _stackModals: Store<ModalState>[] = [];
	get stackModals(): ReadonlyArray<Store<ModalState>[]> {
		return this._stackModals as unknown as ReadonlyArray<Store<ModalState>[]>;
	}
	private _actualModalStore?: Store<ModalState>;
	get actualModal(): Store<ModalState> | undefined {
		return this._actualModalStore;
	}
	private _actualModalState?: ModalState;
	get actualModalState(): Readonly<ModalState | undefined> {
		return this._actualModalState;
	}
	get isOpen(): boolean {
		return this.numActiveModals > 0;
	}

	// ANCHOR : Constructor
	constructor() {
		this.stackStores.state$.subscribe((stack) => {
			this._stackModals = stack;
		});
	}

	// ANCHOR : Methods

	/**
	 * ? Asigna el componente que es el contenedor del modal
	 * @public
	 * @param {ModalComponent} container
	 */
	public assignContainerModal(container: ModalComponent): void {
		this.modal = container;
	}

	/**
	 * ? Metodo para abrir un nueo modal
	 * @public
	 */
	public open<Returned = { isOk: boolean }, C = any, D = any>(
		component: Type<C>,
		options?: { data?: D; modalOptions?: ModalOptions }
	): ModalReturnedAtOpen<Returned> {
		const newStore = this._createModalStore<Returned, C, D>(
			component,
			options || {}
		);
		const actualState = newStore.getState();
		const { afterClosedSubject } = actualState!;
		return {
			afterClosed$: afterClosedSubject.asObservable(),
			close: () => this.close(),
			modalContainer: this.modal,
		};
	}

	/**
	 * ? Metodo para crear un nuevo modal y añadirlo a la pila del store
	 * @public
	 */
	public close(returnedData: any = { isOk: false }): void {
		// if (returnedData) {
		const { afterClosedSubject } = this._actualModalState!;
		afterClosedSubject.next(returnedData);
		afterClosedSubject.complete();
		// }
		//* Al cerrarse se triggera el observable de isOpen$ y se elimina el modal de la pila
		this._actualModalStore?.setParam('isOpen', false);
	}

	/**
	 * ? Metodo para crear un nuevo modal y añadirlo a la pila del store
	 * @private
	 * @template Returned
	 * @template C
	 * @template D
	 * @param {Type<C>} component
	 * @param {?{ data?: D; modalOptions?: ModalOptions }} [options]
	 * @returns {Store<ModalState<Returned, C, D>>}
	 */
	private _createModalStore<Returned, C, D>(
		component: Type<C>,
		options?: { data?: D; modalOptions?: ModalOptions }
	): Store<ModalState<Returned, C, D>> {
		let { data, modalOptions = {} } = options || {};
		modalOptions = {
			...this._getDefaultModalOptions(),
			...modalOptions,
		};

		const newModalState: ModalState<Returned, C, D> = {
			isOpen: true,
			component,
			data,
			options: modalOptions,
			afterClosedSubject: new Subject<Returned>(),
		};
		const newModalStore = createStore<ModalState<Returned, C, D>>(
			newModalState,
			this._modalStoreOptions
		);
		this._actualModalState = newModalState;
		this._actualModalStore = newModalStore;

		this.stackStores.setState([
			...this.stackStores.getState(),
			newModalStore,
		]);

		const {
			params: { isOpen$ },
		} = newModalStore;

		isOpen$.subscribe({
			next: (isOpen) => {
				if (!isOpen) this._deleteLastModal();
			},
		});

		this.modal.createChildComponent(newModalState);
		return newModalStore;
	}

	/**
	 * ? Metodo para eliminar el ultimo modal de la pila y terminar sus subscripciones
	 * @private
	 */
	private _deleteLastModal(): void {
		if (this.numActiveModals === 0) return;
		const { getState, setState } = this.stackStores;
		const state = getState();
		const lastState = state[state.length - 1];
		lastState.endState();
		state.pop();
		setState(state);
		const finalState = getState();
		if (finalState.length === 0) {
			this.modal.removeChildComponent();
			this._actualModalStore = undefined;
			this._actualModalState = undefined;
		} else {
			this._actualModalStore = finalState[finalState.length - 1];
			this._actualModalState = this._actualModalStore.getState();
		}
	}

	/**
	 * ? Metodo para obtener las opciones por defecto del modal
	 * @private
	 * @returns {ModalOptions}
	 */
	private _getDefaultModalOptions(): ModalOptions {
		return {
			hasDefaultHeader: true,
			hasDefaultFooter: true,
			closeOnOutsideClick: true,
			title: '',
		};
	}
}
