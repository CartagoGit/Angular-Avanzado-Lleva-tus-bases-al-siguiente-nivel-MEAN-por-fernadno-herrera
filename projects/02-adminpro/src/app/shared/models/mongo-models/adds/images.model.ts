import { Injector } from '@angular/core';
import { FilesService } from '../../../services/http/files.service';

/**
 * ? Clase que permite agregar imagenes a un modelo
 * @export
 * @class ImageAdd
 * @typedef {ImageAdd}
 */
export class ImageAdd {
	// ANCHOR : Variables
	public defaultImgIndex: number = 0;

	public defaultImg: string;
	public defaultImgSrc!: string;

	private _filesSvc: FilesService;
	private _hasImages: boolean;
	// private _defaultNoImageSrc: string = 'assets/images/no-image.jpg';

	// ANCHOR : Constructor
	constructor(
		props: { images?: string[]; google?: boolean } = {
			images: [],
			google: false,
		}
	) {
		const { images, google } = props;

		//* Injecta el servicio de archivos para poder descargar las imagenes
		const injector = Injector.create({
			providers: [{ provide: FilesService, useClass: FilesService }],
		});
		this._filesSvc = injector.get(FilesService);

		this._hasImages = !!images && images.length > 0;

		//* Asigna la imagen por defecto y la descarga si es necesario
		this.defaultImg = this._hasImages ? images![this.defaultImgIndex] : '';
		// : this._defaultNoImageSrc;

		if (!this._hasImages || google) this.defaultImgSrc = this.defaultImg;
		else {
			this._filesSvc.downloadFileFullPath(this.defaultImg).subscribe({
				next: (source) => {
					this.defaultImgSrc = source;
				},
				error: () => (this.defaultImgSrc = ''),
				// error: () => (this.defaultImgSrc = this._defaultNoImageSrc),
			});
		}
	}
}
