
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
}
