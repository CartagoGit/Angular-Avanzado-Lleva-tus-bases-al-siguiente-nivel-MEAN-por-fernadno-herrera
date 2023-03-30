import { Roles } from '../../interfaces/roles.interface';
import { BaseModelsProps } from '../../interfaces/models/base-model.interface';
import { ModelsMethods } from './adds/models-methods.model';

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
export class User extends ModelsMethods<UserProps> implements UserProps {
	// ANCHOR - Variables

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

	// ANCHOR - Constructor
	constructor(props: UserProps) {
		super();
		this.update(props);
	}

	// ANCHOR - Métodos
}
