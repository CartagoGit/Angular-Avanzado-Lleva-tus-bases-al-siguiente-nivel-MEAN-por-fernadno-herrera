import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageFiles } from '../../models/common/images-model';
import { TypeFile } from '../../interfaces/models.interface';
import { SweetAlertService } from '../../services/helpers/sweet-alert.service';

@Component({
	selector: 'app-input-file',
	templateUrl: './input-file.component.html',
	styleUrls: ['./input-file.component.css'],
})
export class InputFileComponent {
	// ANCHOR : Variables
	@Input('image') image: ImageFiles = new ImageFiles();
	@Input('isDisabled') isDisabled: boolean = false;
	@Input('format') format: TypeFile = 'all';

	@Output() imageChanged: EventEmitter<ImageFiles> =
		new EventEmitter<ImageFiles>();

	public filesFormat: Omit<Record<TypeFile, string>, 'all'> = {
		image: '.jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff|images/*',
		video: '.mp4, .avi, .mov, .wmv, .flv, .mkv, .webm|video/*',
		audio: '.mp3, .wav, .wma, .ogg, .aac, .flac, .m4a|audio/*',
		pdf: '.pdf|application/pdf',
		icon: '.ico|image/x-icon',
		text: '.txt|text/plain',
	};

	public fileFormat: string = '';

	// ANCHOR : Constructor
	constructor(private _sweetAlertSvc: SweetAlertService) {}

	ngOnInit(): void {
		this.fileFormat =
			this.format === 'all'
				? Object.values(this.filesFormat).join(', ')
				: this.filesFormat[this.format];
	}

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
		} else {
			const filesArray: File[] = Array.from(filesList);
			const isImage: boolean = filesArray.every((file) =>
				file.type.includes('image')
			);
			if (!isImage) {
				this._sweetAlertSvc.alertError('Just allow images');
				this.image = new ImageFiles();
			} else this.image = new ImageFiles({ filesArray });
		}
		this.imageChanged.emit(this.image);
	}
}
