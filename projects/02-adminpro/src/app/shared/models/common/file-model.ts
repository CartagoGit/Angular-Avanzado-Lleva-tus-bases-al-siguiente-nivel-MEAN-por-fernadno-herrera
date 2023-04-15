/**
 * ? Interface para manejar las imagenes
 * @export
 * @interface ImageFiles
 * @typedef {ImageFiles}
 */
export interface FileModelProps {
	filesArray: File[];
	readonly name: string;
	readonly file: File | undefined;
	readonly url: string | undefined;
}

/**
 * ? Modelo para manejar las imagenes
 * @export
 * @class ImageFiles
 * @typedef {ImageFiles}
 */
export class FileModel implements FileModelProps {
	// ANCHOR : Variables
	public filesArray: File[] = [];
	get name(): string {
		return this.filesArray.length > 0 ? this.filesArray[0].name : '';
	}
	get file(): File | undefined {
		return this.filesArray.length > 0 ? this.filesArray[0] : undefined;
	}
	get url(): string | undefined {
		return this.file ? URL.createObjectURL(this.file) : undefined;
	}

	// ANCHOR : Constructor
	constructor(data?: { filesArray: File[] }) {
		this.filesArray = data?.filesArray || [];
	}
}
