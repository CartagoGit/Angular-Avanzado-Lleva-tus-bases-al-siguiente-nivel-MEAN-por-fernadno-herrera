import { Injector } from '@angular/core';
import { FilesService } from '../../../services/http/files.service';
import { pathDefaultImage } from '../../../constants/strings.constants';
import { Observable, Observer, Subject, finalize } from 'rxjs';

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

	private _defaultImgSrcObserver: Subject<string> = new Subject<string>();
	public defaultImgSrc$: Observable<string> =
		this._defaultImgSrcObserver.asObservable();

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
		const { images, google = false } = props;

		//* Injecta el servicio de archivos para poder descargar las imagenes
		const injector = Injector.create({
			providers: [{ provide: FilesService, useClass: FilesService }],
		});
		this._filesSvc = injector.get(FilesService);

		this._hasImages = !!images && images.length > 0;

		//* Asigna la imagen por defecto y la descarga si es necesario
		this.defaultImg = this._hasImages
			? images![this.defaultImgIndex]
			: pathDefaultImage;
		// : this._defaultNoImageSrc;

		if (!this._hasImages || google) this.defaultImgSrc = this.defaultImg;
		else {
			this._filesSvc
				.downloadFileFullPath(this.defaultImg)
				.pipe(
					finalize(() => {
						this._defaultImgSrcObserver.complete();
					})
				)
				.subscribe({
					next: (source) => {
						this.defaultImgSrc = source;
						this._defaultImgSrcObserver.next(this.defaultImgSrc);
						this._defaultImgSrcObserver.complete();
					},
					error: () => (this.defaultImgSrc = ''),
					// error: () => (this.defaultImgSrc = this._defaultNoImageSrc),
				});
		}
	}
}
