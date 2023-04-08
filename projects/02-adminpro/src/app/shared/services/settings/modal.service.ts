import { Injectable, Type } from '@angular/core';
import { createStore } from '../../helpers/store.helper';
import { ModalComponent } from '../../components/modal/modal.component';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	// ANCHOR : Variables

	public modal = ModalComponent;

	private readonly _modalState = {
		component: null as Type<any> | null,
	};

	public modalStore = createStore(this._modalState, {
		denyDeepChangesInParams: ['component'],
		allowDeepChangesInParams: ['component']
	});

	private _isOpen: boolean = false;

	get isOpen(): boolean {
		return this._isOpen;
	}

	// ANCHOR : Constructor
	constructor() {}

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
	public open<T, K>(
		component: Type<T>,
		options?: { data?: K }
	): typeof ModalComponent {
		const { data } = options || {};

		console.log(component, data);
		this._isOpen = true;

		return this.modal;
	}

	/**
	 * ? Method to close the modal
	 * @public
	 */
	public close(): void {
		this._isOpen = false;
	}
}
