# This will be the structure of support models

```sh
<div class="row animated fadeIn fast">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<input
					type="text"
					class="form-control"
					placeholder="Search user..."
				/>
			</div>
		</div>
	</div>
</div>

<div class="row animated fadeIn fast" *ngIf="isLoading">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<div class="alert alert-info text-center">
					<h4 class="alert-heading">Searching...</h4>
					<i class="fa fa-spin fa-refresh fa-2x"></i>
					<p class="mb-0">Please wait</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="row animated fadeIn fast" *ngIf="!isLoading">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<h4 class="card-title">Users</h4>
				<h6 class="card-subtitle">Register users in the app</h6>
				<div class="table-grid table-ellipsis table-users">
					<div class="table-grid__header table-grid__row">
						<div class="table-grid__field center-items">Img</div>
						<div class="table-grid__field">Email</div>
						<div class="table-grid__field">Name</div>
						<div class="table-grid__field">Role</div>
						<div class="table-grid__field">Registered</div>
						<div class="table-grid__field d-center">Actions</div>
					</div>
					<div class="table-grid__body">
						<div *ngFor="let user of users" class="table-grid__row">
							<div class="table-grid__field center-items">
								<img
									[src]="user.dataImages?.defaultImgSrc! | safe"
									alt="profile image user"
									class="portrait"
								/>
							</div>
							<div class="table-grid__field">
								<span>{{ user.email }}</span>
							</div>
							<div class="table-grid__field">
								<span>
									{{ user.name }}
								</span>
							</div>
							<div class="table-grid__field">
								<span>
									{{ rolesName[user.role] }}
								</span>
							</div>
							<div class="table-grid__field">
								<span>
									{{ user.createdAt | date : 'dd-MMM-yyyy' }}
								</span>
							</div>
							<div class="table-grid__field text-nowrap d-center">
								<a
									href="#"
									data-toggle="tooltip"
									data-original-title="Edit"
								>
									<i class="fa fa-pencil text-inverse m-r-10"></i>
								</a>
								<a
									href="#"
									data-toggle="tooltip"
									data-original-title="remove"
								>
									<i class="fa fa-close text-danger"></i>
								</a>
							</div>
						</div>
					</div>
				</div>

				<app-footer-table
					[pagination]="pagination"
					(pageChanged)="changePage($event)"
				></app-footer-table>
			</div>
		</div>
	</div>
</div>

```
