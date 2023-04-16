import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { FileModel } from '../../models/common/file-model';
import { TypeFile } from '../../interfaces/models.interface';
import { SweetAlertService } from '../../services/helpers/sweet-alert.service';

@Component({
	selector: 'app-input-file',
	templateUrl: './input-file.component.html',
	styleUrls: ['./input-file.component.css'],
})
export class InputFileComponent {
	// ANCHOR : Variables
	@Input('file') file: FileModel = new FileModel();
	@Input('isDisabled') isDisabled: boolean = false;
	@Input('format') format: TypeFile = 'all';

	@Output() fileChanged: EventEmitter<FileModel> =
		new EventEmitter<FileModel>();

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
	 * ? Cambia el archivo seleccionado en el input
	 * @public
	 * @param {Event} event
	 */
	public changeFile(event: Event): void {
		const filesList: FileList | null = (event.target as HTMLInputElement)
			.files;

		if (!filesList || !filesList[0]) {
			this.file = new FileModel();
		} else {
			const filesArray: File[] = Array.from(filesList);
			const isKindFile: boolean = filesArray.every((file) => {
				return file.type.includes(this.format);
			});
			if (!isKindFile) {
				this._sweetAlertSvc.alertError(`Just allowed ${this.format} files`);
				this.file = new FileModel();
			} else this.file = new FileModel({ filesArray });
		}
		this.fileChanged.emit(this.file);
	}
}
