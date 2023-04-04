import { Component } from '@angular/core';

@Component({
	selector: 'app-modal-image',
	templateUrl: './modal-image.component.html',
	styleUrls: ['./modal-image.component.css'],
})
export class ModalImageComponent {
	// ANCHOR - Variables
	public showModal: boolean = true;

	// ANCHOR - Constructor
	constructor() {}

	// ANCHOR - Methods


	/**
	 * ? Method to toggle the modal
	 * @public
	 */
	public toggleModal(): void {
		this.showModal = !this.showModal;
	}
}
