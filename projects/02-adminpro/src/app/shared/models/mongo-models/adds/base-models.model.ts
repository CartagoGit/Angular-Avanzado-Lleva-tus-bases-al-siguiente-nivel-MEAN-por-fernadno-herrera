import { ImageAdd } from './images.model';

/**
 * ? Props base que reciben todos los modelos de mongo
 * @export
 * @interface BaseModelsProps
 * @typedef {BaseModelsProps}
 */
export interface BaseModelsProps {
	createdAt: Date;
	updatedAt: Date;
	id: string;
	user_creator: string;
	user_modifier: string;
	typeModel: 'User' | 'Hospital' | 'Doctor';
}

/**
 * ? Modelo base para los modelos de la base de datos
 * @export
 * @class BaseModels
 * @typedef {BaseModels}
 * @template ModelProps
 */
export class BaseModels<ModelProps extends {} = {}>
	implements Omit<BaseModelsProps, 'typeModel'>
{
	// ANCHOR : Variables
	//* Desde el back
	public readonly id!: string;
	public readonly user_creator!: string;
	public readonly user_modifier!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	//* Para usar desde el front
	protected _dataImages?: ImageAdd;
	public get dataImages(): ImageAdd | undefined {
		return this._dataImages;
	}

	//* Propias de la clase
	private readonly _hasImages: boolean = false;

	// ANCHOR : Constructor

	constructor(props: ModelProps) {
		//* Comprobamos si el modelo tiene imagenes y en caso de que no las tenga eliminamos las propiedades y metodos relativos
		this._hasImages = !!(props as any)['images'];

		this.update(props);
	}

	// ANCHOR : Métodos

	/**
	 * ? Actualiza las propiedades del usuario
	 * @public
	 * @param {UserProps} props
	 */
	public update(props: ModelProps) {
		this.updateOnlyProps(props);
		if (this._hasImages) this.updateOnlyImages(props);
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
		if (!this._hasImages) throw new Error('This model does not have images');
		this._dataImages = new ImageAdd({ ...props })!;
	}
}
