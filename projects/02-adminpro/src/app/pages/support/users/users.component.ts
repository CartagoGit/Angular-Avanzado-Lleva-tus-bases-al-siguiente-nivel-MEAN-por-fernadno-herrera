import { Component } from '@angular/core';
import { PaginationData } from '../../../shared/interfaces/http/request.interface';
import { UsersService } from '../../../shared/services/http/models/users.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
})
export class UsersComponent {
	// ANCHOR - Variables
	public users: any[] = [];
	public paginationData: PaginationData = { limit: 5, page: 1 };

	// ANCHOR - Constructor
	constructor(private _usersService: UsersService) {
		this.loadUsers();
	}

	// ANCHOR - Methods


	/**
	 * ? Carga los usuarios de la base de datos con los parametros de paginacion
	 * @public
	 */
	public loadUsers() {
		this._usersService.getAll(this.paginationData).subscribe((res) => {
			console.log(res);
		});
	}
}
