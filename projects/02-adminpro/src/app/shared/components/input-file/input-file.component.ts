import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageFiles } from '../../models/common/images-model';

@Component({
	selector: 'app-input-file',
	templateUrl: './input-file.component.html',
	styleUrls: ['./input-file.component.css'],
})
export class InputFileComponent {
	// ANCHOR : Variables
	@Input('image') image: ImageFiles = new ImageFiles();
	@Input('isDisabled') isDisabled: boolean = false;

	@Output() imageChanged: EventEmitter<ImageFiles> =
		new EventEmitter<ImageFiles>();

	// ANCHOR : Constructor
	constructor() {}

	// ANCHOR : Methods
	/**
	 * ? Cambia la imagen seleccionada que se actualizara en el perfil
	 * @public
	 * @param {Event} event
	 */
	public changeImage(event: Event): void {
		const filesList: FileList | null = (event.target as HTMLInputElement)
			.files;
		if (!filesList || !filesList[0]) {
			this.image = new ImageFiles();
			return;
		} else this.image = new ImageFiles({ filesArray: Array.from(filesList) });
		this.imageChanged.emit(this.image);
	}
}
