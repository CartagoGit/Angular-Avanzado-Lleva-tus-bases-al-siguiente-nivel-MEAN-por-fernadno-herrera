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
  * ? Interface de archivo con blob y base 64
  * @export
  * @interface FileWithUrls
  * @typedef {FileWithUrls}
  */
 export interface FileWithUrls {
	file: File;
	url: string;
	urlBase64: string;
	urlBase64WithoutStart: string;
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
	public fileWithUrls: FileWithUrls[] = [];

	// ANCHOR : Constructor
	constructor(data?: { filesArray: File[] }) {
	  this.filesArray = data?.filesArray || [];

	  Promise.all(
		 this.filesArray.map(async (file) => {
			const fileWithUrl = await this._readFile(file);
			return fileWithUrl;
		 })
	  ).then((files) => (this.fileWithUrls = files));

	  this.name = this.filesArray.length > 0 ? this.filesArray[0].name : '';
	  this.file = this.filesArray.length > 0 ? this.filesArray[0] : undefined;
	  this.url = this.file ? URL.createObjectURL(this.file) : undefined;
	}


	/**
	 * ? Convierte un archivo blob a base64
	 * @private
	 * @param {File} file
	 * @returns {Promise<FileWithUrls>}
	 */
	private _readFile(file: File): Promise<FileWithUrls> {
	  return new Promise((resolve, reject) => {
		 const reader = new FileReader();
		 reader.readAsDataURL(file);
		 reader.onload = () => {
			const urlBase64 = reader.result as string;
			const urlBase64WithoutStart = urlBase64.split('base64,')[1];
			resolve({
			  file,
			  url: URL.createObjectURL(file),
			  urlBase64,
			  urlBase64WithoutStart,
			});
		 };
		 reader.onerror = () => reject(reader.error as any);
	  });
	}
 }
