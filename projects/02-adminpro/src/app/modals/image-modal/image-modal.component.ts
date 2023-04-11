import { Component } from '@angular/core';
import { DefaultErrorResponse } from '../../shared/interfaces/http/response.interfaces';
import { ModalService } from '../../shared/services/settings/modal.service';
import { FilesService } from '../../shared/services/http/files.service';
import { SweetAlertService } from '../../shared/services/helpers/sweet-alert.service';
import { BaseModels } from '../../shared/models/mongo-models/adds/base-models.model';
import { User } from '../../shared/models/mongo-models/user.model';
import { isUser, getTypeModel } from '../../shared/helpers/models.helpers';
import { Hospital } from '../../shared/models/mongo-models/hospital.model';
import { Doctor } from '../../shared/models/mongo-models/doctor.model';
import {
	ModelsMongo,
	ModelClassMongo,
} from '../../shared/interfaces/models.interface';

@Component({
	selector: 'app-image-modal',
	templateUrl: './image-modal.component.html',
	styleUrls: ['./image-modal.component.css'],
	// standalone: true,
	// imports: [PipesModule],
})
export class ImageModalComponent<Model extends User | Hospital | Doctor> {
	// ANCHOR : Variables
	//!! La data se recupera y es un parametro exclusivo al crear la instancia del modal
	public data = {} as Model;

	public isUserAndGoogle: boolean = false;

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
		// !! Aqui ya habria entrado la data
		// this.user = this.data;
		this.isUserAndGoogle = isUser(this.data) && this.data.google;
	}

	// ANCHOR : Methods

	/**
	 * ? Cierra el modal
	 * @public
	 */
	public close(data?: any): void {
		// this._modalSvc.close({ algo: 'de vuelta' });
		this._modalSvc.close(data);
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
	public updateImage(): void {
		if (!this.image.name || this.isUserAndGoogle) return;
		const { classModel } = this.data;

		const typeModel = getTypeModel(classModel);

		if (!typeModel) {
			return console.error(
				'No se encontro el tipo de modelo en el objeto typeModels'
			);
		}

		const images = this._images;
		if (!images || !Array.isArray(images) || images.length === 0) return;
		this._filesSvc
			.uploadFile({
				filesToUpload: images!,
				id: this.data.id,
				typeFile: 'images',
				typeModel,
			})
			.subscribe({
				next: (resp) => {
					this.data.updateOnlyImages({ images: resp.filesRoute });
					this._sweetAlertSvc.alertSuccess('Image updated');
					this.image = { name: '' };
					this._images = [];
					this.close();
				},
				error: (error: DefaultErrorResponse) => {
					this._sweetAlertSvc.alertError(error.error_message);
				},
			});
	}
}
