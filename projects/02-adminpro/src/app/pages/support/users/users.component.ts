import { Component } from '@angular/core';
import { PaginationData } from '../../../shared/interfaces/http/request.interface';
import { UsersService } from '../../../shared/services/http/models/users.service';
import { SweetAlertService } from '../../../shared/services/helpers/sweet-alert.service';
import { User } from '../../../shared/models/mongo-models/user.model';
import { Role } from '../../../../../../03-backend/src/app/interfaces/roles.interface';
import { formatDate } from '../../../shared/constants/strings.constants';
import { Pagination } from '../../../shared/interfaces/http/pagination.interface';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
})
export class UsersComponent {
	// ANCHOR - Variables
	public formatDate = formatDate;
	public users: User[] = [];
	public paginationData: PaginationData = { limit: 5, page: 1 };
	public isLoading : boolean = false;

	public rolesName: Record<Role, string> = {
		ADMIN_ROLE: 'Administrator',
		USER_ROLE: 'Common user',
	};

	public pagination?: Pagination;

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
		this.isLoading= true;
		this._usersService.getAll(this.paginationData).subscribe({
			next: (res) => {
				if (!res || !res.data) {
					this._sweetAlertService.alertError('Cannot load users');
					return;
				}
				this.users = res.data.map((user) => new User(user));
				this.pagination = res.pagination;
				this.isLoading= false;
			},
			error: (err) => {
				this._sweetAlertService.alertError(err.error.msg);
			},
		});
	}
}
