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
	public readonly name: string = '';
	public readonly file: File | undefined;
	public readonly url: string | undefined;

	// ANCHOR : Constructor
	constructor(data?: { filesArray: File[] }) {
		this.filesArray = data?.filesArray || [];
		this.name = this.filesArray.length > 0 ? this.filesArray[0].name : '';
		this.file = this.filesArray.length > 0 ? this.filesArray[0] : undefined;
		this.url = this.file ? URL.createObjectURL(this.file) : undefined;
	}
}
