import { Component } from '@angular/core';
import { ModalService } from '../../services/settings/modal.service';

@Component({
	selector: 'app-modal-image',
	templateUrl: './modal-image.component.html',
	styleUrls: ['./modal-image.component.css'],
})
export class ModalImageComponent {
	// ANCHOR - Variables

	// ANCHOR - Constructor
	constructor(public modalSvc: ModalService) {}

	// ANCHOR - Methods
}
