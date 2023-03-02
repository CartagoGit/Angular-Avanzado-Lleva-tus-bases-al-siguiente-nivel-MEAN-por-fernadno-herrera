import { Roles } from "../../interfaces/roles.interface";
import { BaseModelsProps } from "./base-model.interface";


/**
 * ? Propiedades que recibe el Modelo de usuarios a recibir desde el back
 * @export
 * @interface UserProps
 * @typedef {UserProps}
 */
export interface UserProps extends BaseModelsProps {
	images: string[];
	name: string;
	email: string;
	role: Roles;
	google: boolean;
}

/**
 * ? Modelo de Usuario a recibir desde el back
 * @export
 * @class User
 * @typedef {User}
 * @implements {UserProps}
*/
export class User implements UserProps {
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

	constructor(props: UserProps) {
		for (let [key, value] of Object.entries(props)) {
			this[key as keyof this] = value;
		}
	}
}
