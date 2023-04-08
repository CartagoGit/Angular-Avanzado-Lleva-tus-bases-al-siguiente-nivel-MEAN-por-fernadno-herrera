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

	// private readonly _modalState: ModalState;

	private readonly _modalStoreOptions: StoreOptions<ModalState> = {
		denyDeepChangesInParams: ['component'],
	};

	// public modalStore: Store<ModalState>;

	// private _stackStores: Store<ModalState>[] = [];
	// get stackStores() : Store<ModalState>[] {
	// 	return this._stackStores;
	// };
	public readonly stackStores = createStore<Store<ModalState>[]>([], {
		allowDeepChanges: false,
	});

	private _activeModals: number = 0;
	get activeModals(): number {
		return this._activeModals;
	}

	private _isOpen: boolean = false;
	get isOpen(): boolean {
		return this._isOpen;
	}

	// ANCHOR : Constructor
	constructor() {
		// console.log(this.modalStore);
		const { state$ } = this.stackStores;

		state$.subscribe((stack) => {
			console.log('subscribe ➽ ⏩', stack);
		});
	}

	// ANCHOR : Methods

	/**
	 * ? Method to toggle the modal
	 * @public
	 */
	public toggle(): void {
		this._isOpen = !this._isOpen;
	}

	/**
	 * ? Method to open the modal
	 * @public
	 */
	public open<C, D>(
		component: Type<C>,
		options?: { data?: D }
	): typeof ModalComponent {
		const { data } = options || {};
		this._createNewModal(component, data);

		// this._isOpen = true;

		return this.modal;
	}

	/**
	 * ? Method to close the modal
	 * @public
	 */
	public close(): void {}

	private _createNewModal<C, D>(
		component: Type<C>,
		data: D
	): Store<ModalState<C, D>> {
		const modalStore = createStore<ModalState<C, D>>({
			isOpen: true,
			component,
			data,
		});

		const algo = this.stackStores.getState();
		
		this.stackStores.setState([...this.stackStores.getState(), modalStore]);

		console.log('❗stack ➽ ⏩', this.stackStores.getState(), this.stackStores.isObserved());
		this.stackStores.setState([...this.stackStores.getState(), modalStore]);

		console.log(this.stackStores.getState());
		// this.stackStores.reloadState();
		return modalStore;
	}
}
