import { Component } from '@angular/core';
import { User } from '../../shared/models/mongo-models/user.model';
import { ModalService } from '../../shared/services/settings/modal.service';

@Component({
	selector: 'app-image-modal',
	templateUrl: './image-modal.component.html',
	styleUrls: ['./image-modal.component.css'],
	// standalone: true,
	// imports: [PipesModule],
})
export class ImageModalComponent {
	// ANCHOR : Variables
	//* se recupera al crear la instancia del modal
	public data: User = {} as User;
	public user: User = {} as User;

	public image: { name: string; file?: File; url?: string } = {
		name: '',
	};

	// ANCHOR : Constructor
	constructor(private _modalSvc: ModalService) {}

	ngOnInit(): void {
		this.user = this.data;
	}

	// ANCHOR : Methods

	/**
	 * ? Cierra el modal
	 * @public
	 */
	public close(): void {
		// this._modalSvc.close({ algo: 'de vuelta' });
		this._modalSvc.close();
	}

	/**
	 * ? Cambia la imagen seleccionada que se actualizara en el perfil
	 * @public
	 * @param {Event} event
	 */
	public changeImage(event: Event): void {
		const filesList: FileList | null = (event.target as HTMLInputElement)
			.files;
		if (!filesList || !filesList[0]) {
			this.image = { name: '' };
			return;
		}

		this.image = {
			...this.image,
			file: filesList[0],
			name: filesList[0].name,
			url: URL.createObjectURL(filesList[0]),
		};
	}
}
