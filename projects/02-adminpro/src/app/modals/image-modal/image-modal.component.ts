import { Component } from '@angular/core';
import { DefaultErrorResponse } from '../../shared/interfaces/http/response.interfaces';
import { User } from '../../shared/models/mongo-models/user.model';
import { ModalService } from '../../shared/services/settings/modal.service';
import { FilesService } from '../../shared/services/http/files.service';
import { SweetAlertService } from '../../shared/services/helpers/sweet-alert.service';

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
	private _images: File[] = [];

	// ANCHOR : Constructor
	constructor(
		private _modalSvc: ModalService,
		private _filesSvc: FilesService,
		private _sweetAlertSvc: SweetAlertService
	) {}

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
			this._images = [];
			return;
		}

		this.image = {
			...this.image,
			file: filesList[0],
			name: filesList[0].name,
			url: URL.createObjectURL(filesList[0]),
		};
		this._images = Array.from(filesList);
	}

	/**
	 * ? Actualiza la imagen del perfil
	 * @public
	 */
	public updateImageProfile(): void {
		if (!this.image.name || this.user.google) return;

		const images = this._images;
		if (!images || !Array.isArray(images) || images.length === 0) return;
		this._filesSvc
			.uploadFile({
				filesToUpload: images!,
				id: this.user.id,
				typeFile: 'images',
				typeModel: 'users',
			})
			.subscribe({
				next: (resp) => {
					this.user.updateOnlyImages({ images: resp.filesRoute });
					this._sweetAlertSvc.alertSuccess('Image updated');
					this.image = { name: '' };
					this._images = [];
				},
				error: (error: DefaultErrorResponse) => {
					this._sweetAlertSvc.alertError(error.error_message);
				},
			});
	}
}
