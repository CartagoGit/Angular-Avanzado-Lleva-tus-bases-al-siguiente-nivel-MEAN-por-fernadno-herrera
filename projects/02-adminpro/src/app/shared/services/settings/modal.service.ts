import { Injectable, Type } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	// ANCHOR : Variables
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
	public open<T>(component: Type<T>, options?: { data?: any }): void {
		const { data } = options || {};
		console.log(component, data);
		this._isOpen = true;
	}

	/**
	 * ? Method to close the modal
	 * @public
	 */
	public close(): void {
		this._isOpen = false;
	}
}
