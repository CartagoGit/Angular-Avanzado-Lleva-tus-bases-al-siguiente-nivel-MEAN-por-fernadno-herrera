import { Injector } from '@angular/core';
import { FilesService } from '../../../services/http/files.service';

export class ImageAdd {
	public defaultImgIndex: number = 0;

	public defaultImg: string;
	public defaultImgSrc!: string;

	private _filesSvc: FilesService;
	private _hasImages: boolean;
	private _defaultNoImageSrc: string = 'assets/images/no-image.jpg';

	constructor(
		props: { images?: string[]; google?: boolean } = {
			images: [],
			google: false,
		}
	) {
		const { images, google } = props;
		const injector = Injector.create({
			providers: [{ provide: FilesService, useClass: FilesService }],
		});

		this._filesSvc = injector.get(FilesService);

		this._hasImages = !!images && images.length > 0;

		this.defaultImg = this._hasImages
			? images![this.defaultImgIndex]
			: this._defaultNoImageSrc;

		if (!this._hasImages || google) this.defaultImgSrc = this.defaultImg;
		else {

			this._filesSvc.downloadFileFullPath(this.defaultImg).subscribe({
				next: (source) => {

					this.defaultImgSrc = source;
				},
				error: () => (this.defaultImgSrc = this._defaultNoImageSrc),
			});
		}
	}
}
