import { Component } from '@angular/core';
import { PaginationData } from '../../../shared/interfaces/http/request.interface';
import { UsersService } from '../../../shared/services/http/models/users.service';
import { SweetAlertService } from '../../../shared/services/helpers/sweet-alert.service';
import { User } from '../../../shared/models/mongo-models/user.model';
import { Role } from '../../../../../../03-backend/src/app/interfaces/roles.interface';
import { formatDate } from '../../../shared/constants/strings.constants';
import { Pagination } from '../../../shared/interfaces/http/pagination.interface';
import { minTimeBeforeLoader } from '../../../shared/constants/time.constants';
import { StateService } from '../../../shared/services/settings/state.service';
import { DefaultErrorResponse } from '../../../shared/interfaces/http/response.interfaces';
import { ModalService } from '../../../shared/services/settings/modal.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
	selector: 'page-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
})
export class UsersComponent {
	// ANCHOR - Variables
	public formatDate = formatDate;
	public users: User[] = [];
	public paginationData: PaginationData = { limit: 5, page: 1 };
	public isLoading: boolean = false;

	public rolesData: Record<Role, { text: string; typeLabel: string }> = {
		ADMIN_ROLE: { text: 'Administrator', typeLabel: 'label-info' },
		USER_ROLE: { text: 'User', typeLabel: 'label-primary' },
	};

	public googleUserData: Record<
		'true' | 'false',
		{ text: string; typeLabel: string }
	> = {
		true: { text: 'Google', typeLabel: 'label-danger' },
		false: { text: 'Email', typeLabel: 'label-success' },
	};

	public pagination?: Pagination;
	public searchText?: string;
	public actualUser: User = this._stateService.user!;

	private _lastSearch = {
		page: 0,
		searchText: '',
	};

	// ANCHOR - Constructor
	constructor(
		private _stateService: StateService,
		private _usersService: UsersService,
		private _sweetAlertService: SweetAlertService,
		private _modalSvc: ModalService
	) {
		this.loadUsers();
	}

	// ANCHOR - Methods

	/**
	 * ? Carga los usuarios de la base de datos con los parametros de paginacion
	 * @public
	 */
	public loadUsers(data?: { obleyLoad?: boolean }) {
		const { obleyLoad = false } = data || {};
		if (
			!obleyLoad &&
			this.searchText === this._lastSearch.searchText &&
			this.paginationData.page === this._lastSearch.page
		) {
			return;
		}

		const timer = setTimeout(() => {
			this.isLoading = true;
		}, minTimeBeforeLoader);
		let query = {};

		if (!!this.searchText)
			query = { ...query, name: this.searchText, email: this.searchText };
		this._usersService
			.getByQuery(query, {
				...this.paginationData,
				someQuery: true,
			})
			.subscribe({
				next: (res) => {
					clearTimeout(timer);
					if (!res || !res.data) {
						this._sweetAlertService.alertError('Cannot load users');
						return;
					}
					this.users = res.data.map((user) => new User(user));
					this.pagination = { ...res.pagination! };
					this.isLoading = false;
					this._lastSearch = {
						page: this.paginationData.page,
						searchText: this.searchText!,
					};
					this.paginationData = { ...this.paginationData, page: 1 };
				},
				error: (err: DefaultErrorResponse) => {
					this._sweetAlertService.alertError(err.error_message);
				},
			});
	}

	/**
	 * ? Cambia la pagina de la tabla
	 * @public
	 * @param {number} page
	 */
	public changePage(page: number) {
		this.paginationData.page = page;
		this.loadUsers();
	}

	/**
	 * ? Elimina un usuario
	 * @public
	 * @param {User} user
	 */
	public deleteUser(user: User): void {
		this._sweetAlertService
			.confirmDeleteModal({
				title: 'Delete user',
				text: `Are you sure you want to delete the user '${user.name}'?`,
				icon: 'warning',
			})
			.then((result) => {
				if (!result.isConfirmed) return;
				this._usersService.delete(user.id).subscribe({
					next: () => {
						this._sweetAlertService.alertSuccess(
							'User deleted correctly'
						);
						this.loadUsers({ obleyLoad: true });
					},
					error: (err : DefaultErrorResponse) => {
						this._sweetAlertService.alertError(err.error_message);
					},
				});
			});
	}


	/**
	 * ? Cambia el rol de un usuario
	 * @public
	 * @param {User} user
	 */
	public changeRole(user: User): void {
		const finalRole: Role =
			user.role === 'ADMIN_ROLE' ? 'USER_ROLE' : 'ADMIN_ROLE';
		this._usersService.put({ ...user, role: finalRole }).subscribe({
			next: () => {
				this._sweetAlertService.alertSuccess('User role changed correctly');
				user.role = finalRole;
			},
			error: (err: DefaultErrorResponse) => {
				this._sweetAlertService.alertError(err.error_message);
			},
		});
	}


	/**
	 * ? Abre el modal para ver la imagen de un usuario
	 * @public
	 * @param {User} user
	 */
	public clickImage(user: User) {
		// this._modalSvc.open(ModalImageComponent, {data: user});
	}
}
