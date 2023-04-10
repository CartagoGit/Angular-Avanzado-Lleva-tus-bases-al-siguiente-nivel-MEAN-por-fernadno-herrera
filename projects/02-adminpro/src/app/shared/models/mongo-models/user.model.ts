import { Roles } from '../../interfaces/roles.interface';

import { BaseModels, BaseModelsProps } from './adds/base-models.model';

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
export class User extends BaseModels<UserProps> implements UserProps {
	// ANCHOR - Variables

	//* Desde el back
	public name!: string;
	public images!: string[];
	public email!: string;
	public google!: boolean;
	public role!: Roles;

	//* Para usar desde el front
	public password?: string;

	public readonly typeModel = 'User';

	// ANCHOR - Constructor
	constructor(props: UserProps) {
		super(props);
	}

	// ANCHOR - Métodos
}
