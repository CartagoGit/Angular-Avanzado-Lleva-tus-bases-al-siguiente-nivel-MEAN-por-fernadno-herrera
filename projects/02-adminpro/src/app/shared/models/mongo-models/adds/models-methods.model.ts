import { ImageAdd } from "./images.model";



export class ModelsMethods<ModelProps extends {}> {

	// ANCHOR : Variables

	public dataImages?: ImageAdd;

	// ANCHOR : Constructor

	constructor() {}

	// ANCHOR : Métodos

	/**
	 * ? Actualiza las propiedades del usuario
	 * @public
	 * @param {UserProps} props
	 */
	public update(props: ModelProps) {
		this.updateOnlyProps(props);
		this.updateOnlyImages(props);
	}

	/**
	 * ? Actualiza unicamente las propiedades del usuario
	 * @public
	 * @param {UserProps} props
	 */
	public updateOnlyProps(props: ModelProps) {
		for (let [key, value] of Object.entries(props)) {
			this[key as keyof this] = value as any;
		}
	}

	/**
	 * ? Actualiza unicamente las imagenes del usuario
	 * @public
	 * @param {{ google: boolean; images: string[] }} props
	 */
	public updateOnlyImages(props: { google?: boolean; images?: string[] }) {
		this.dataImages = new ImageAdd({ ...props })!;
	}
}
