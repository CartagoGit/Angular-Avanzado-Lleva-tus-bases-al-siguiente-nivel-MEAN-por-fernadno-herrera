import { Injectable, Type, ViewChild, ElementRef } from '@angular/core';
import { createStore } from '../../helpers/store.helper';
import { ModalComponent } from '../../components/modal/modal.component';
import { StoreOptions } from '../../interfaces/models/store.interface';
import { Store } from '../../models/store/store.model';
import {
	ModalOptions,
	ModalState,
} from '../../interfaces/models/modal.interface';

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
		return this._activeModals.length;
	}
	private _activeModals: Store<ModalState>[] = [];
	get activeModals(): ReadonlyArray<Store<ModalState>[]> {
		return this._activeModals as unknown as ReadonlyArray<
			Store<ModalState>[]
		>;
	}
	private _actualModalStore?: Store<ModalState>;
	get actualModal(): Store<ModalState> | undefined {
		return this._actualModalStore;
	}
	get isOpen(): boolean {
		return this.numActiveModals > 0;
	}

	// ANCHOR : Constructor
	constructor() {
		this.stackStores.state$.subscribe((stack) => {
			this._activeModals = stack;
			console.log('subscribe ➽ ⏩', stack);
		});
	}

	ngAfterViewInit(): void {
		// this.modal = new ModalComponent(this);
	}

	// ANCHOR : Methods

	public assignContainerModal(container: ModalComponent): void {
		this.modal = container;
	}

	/**
	 * ? Metodo para abrir un nueo modal
	 * @public
	 */
	public open<C, D>(
		component: Type<C>,
		options?: { data?: D; modalOptions?: ModalOptions }
	): ModalComponent {
		this._actualModalStore = this._createModalStore(component, options || {});
		return this.modal;
	}

	/**
	 * ? Metodo para crear un nuevo modal y añadirlo a la pila del store
	 * @public
	 */
	public close(): void {
		this._actualModalStore?.setParam('isOpen', false);
	}

	private _createModalStore<C, D>(
		component: Type<C>,
		options?: { data?: D; modalOptions?: ModalOptions }
	): Store<ModalState<C, D>> {
		const { data = {} as D, modalOptions = this._getDefaultModalOptions() } =
			options || {};
		const newModalState: ModalState<C, D> = {
			isOpen: true,
			component,
			data,
			options: modalOptions,
		};
		const newModalStore = createStore<ModalState<C, D>>(
			newModalState,
			this._modalStoreOptions
		);
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
		if (finalState.length === 0) this._actualModalStore = undefined;
		else this._actualModalStore = finalState[finalState.length - 1];
	}

	/**
	 * ? Metodo para obtener las opciones por defecto del modal
	 * @private
	 * @returns {ModalOptions}
	 */
	private _getDefaultModalOptions(): ModalOptions {
		return {

			hasDefaultHeader: true,

			hasDefaultFooter: false,
			closeOnOutsideClick: true,

		};
	}
}
