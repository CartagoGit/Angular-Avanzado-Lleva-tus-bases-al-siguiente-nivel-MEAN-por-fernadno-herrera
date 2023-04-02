import { Component } from '@angular/core';
import { PaginationData } from '../../../shared/interfaces/http/request.interface';
import { UsersService } from '../../../shared/services/http/models/users.service';
import { SweetAlertService } from '../../../shared/services/helpers/sweet-alert.service';
import { User } from '../../../shared/models/mongo-models/user.model';
import { Role } from '../../../../../../03-backend/src/app/interfaces/roles.interface';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
})
export class UsersComponent {
	// ANCHOR - Variables
	public users: User[] = [];
	public paginationData: PaginationData = { limit: 5, page: 1 };

	public rolesName : { [key in Role]: string } = {
		ADMIN_ROLE: 'Administrator',
		USER_ROLE: 'Common user',
	}

	// ANCHOR - Constructor
	constructor(
		private _usersService: UsersService,
		private _sweetAlertService: SweetAlertService
	) {
		this.loadUsers();
	}

	// ANCHOR - Methods

	/**
	 * ? Carga los usuarios de la base de datos con los parametros de paginacion
	 * @public
	 */
	public loadUsers() {
		this._usersService.getAll(this.paginationData).subscribe({
			next: (res) => {
				if (!res || !res.data) {
					this._sweetAlertService.alertError('Cannot load users');
					return;
				}
				this.users = res.data.map((user) => new User(user));
			},
			error: (err) => {
				this._sweetAlertService.alertError(err.error.msg);
			},
		});
	}
}
