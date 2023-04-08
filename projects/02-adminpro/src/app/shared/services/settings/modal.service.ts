import { Injectable, Type } from '@angular/core';
import { createStore } from '../../helpers/store.helper';
import { ModalComponent } from '../../components/modal/modal.component';
import { StoreOptions } from '../../interfaces/models/store.interface';
import { Store } from '../../models/store/store.model';
import { ModalState } from '../../interfaces/models/modal.interface';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	// ANCHOR : Variables

	public modal = ModalComponent;
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

	// ANCHOR : Methods

	/**
	 * ? Metodo para abrir un nueo modal
	 * @public
	 */
	public open<C, D>(
		component: Type<C>,
		options?: { data?: D }
	): typeof ModalComponent {
		const { data } = options || {};
		this._actualModalStore = this._createModalStore(component, data || {});
		return this.modal;
	}

	/**
	 * ? Metodo para crear un nuevo modal y añadirlo a la pila del store
	 * @public
	 */
	public close(): void {
		this._deleteLastModal();
	}

	private _createModalStore<C, D>(
		component: Type<C>,
		data: D
	): Store<ModalState<C, D>> {
		const newModalStore = createStore<ModalState<C, D>>(
			{
				// isOpen: true,
				component,
				data,
			},
			this._modalStoreOptions
		);
		this.stackStores.setState([
			...this.stackStores.getState(),
			newModalStore,
		]);
		newModalStore.params.data$;

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
}
