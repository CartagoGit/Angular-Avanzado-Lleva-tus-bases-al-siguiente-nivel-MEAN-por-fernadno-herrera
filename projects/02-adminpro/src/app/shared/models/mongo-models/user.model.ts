import { Injector } from '@angular/core';
import { Roles } from '../../interfaces/roles.interface';
import { FilesService } from '../../services/http/files.service';
import { BaseModelsProps } from '../../interfaces/models/base-model.interface';

/**
 * ? Propiedades que recibe el Modelo de usuarios a recibir desde el back
 * @export
 * @interface UserProps
 * @typedef {UserProps}
 */
export interface UserProps extends BaseModelsProps {
	name: string;
	email: string;
	role: Roles;
	images: string[];
	google: boolean;
	password?: string;
}

/**
 * ? Modelo de Usuario a recibir desde el back
 * @export
 * @class User
 * @typedef {User}
 * @implements {UserProps}
 */
export class User implements UserProps {
	//* Desde el back
	public id!: string;
	public user_creator!: string;
	public user_modifier!: string;
	public createdAt!: Date;
	public updatedAt!: Date;

	public name!: string;
	public images!: string[];
	public email!: string;
	public google!: boolean;
	public role!: Roles;

	//* Para usar desde el front
	public password?: string;
	public defaultImgIndex: number = 0;

	public imagesBlob: Blob[] = [];

	public defaultImg: string;
	public defaultImgSrc!: string;

	private _filesSvc: FilesService;
	private _hasImages: boolean;
	private _defaultNoImageSrc : string = 'assets/images/no-image.jpg';

	constructor(props: UserProps) {
		const injector = Injector.create({
			providers: [{ provide: FilesService, useClass: FilesService }],
		});
		this._filesSvc = injector.get(FilesService);

		for (let [key, value] of Object.entries(props)) {
			this[key as keyof this] = value;
		}

		this._hasImages = !!this.images && this.images.length > 0;

		this.defaultImg = this._hasImages
			? this.images[this.defaultImgIndex]
			: this._defaultNoImageSrc;

		// this.defaultImgBlob =
		// 	this.imagesBlob[this.defaultImgIndex] || this.defaultImg;
		if (!this._hasImages || this.google) this.defaultImgSrc = this.defaultImg;
		else {
			this._filesSvc.downloadFileFullPath(this.defaultImg).subscribe({
				next: (source) => {
					this.defaultImgSrc = source;
				},
				error: () => this.defaultImgSrc = this._defaultNoImageSrc,
			});
		}
	}
}
