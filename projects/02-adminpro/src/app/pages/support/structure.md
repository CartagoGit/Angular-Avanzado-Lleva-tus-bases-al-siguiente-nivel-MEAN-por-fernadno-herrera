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

<div class="row animated fadeIn fast">
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

<div class="row animated fadeIn fast">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<h4 class="card-title">Users</h4>
				<h6 class="card-subtitle">Register users in the app</h6>
				<div class="table-responsive">
					<table class="table table-bordered table-ellipsis">
						<thead>
							<tr>
								<th>Image</th>
								<th>Email</th>
								<th>Name</th>
								<th>Role</th>
								<th>Auth</th>
								<th class="text-nowrap">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr *ngFor="let user of users">
								<td>Tantas earum numeris</td>
								<td>Tantas earum numeris</td>
								<td>Tantas earum numeris</td>
								<td>
									<div class="progress progress-xs margin-vertical-10">
										<div
											class="progress-bar bg-inverse"
											style="width: 50%; height: 6px"
										></div>
									</div>
								</td>
								<td>July 11, 2015</td>
								<td class="text-nowrap">
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
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="footer-table">
					<div class="footer-results">
						<div class="footer-result">
							<span class="footer-total-label">Total:</span>
							<span class="footer-total-result">9999</span>
						</div>
					</div>
					<div class="footer-pagination">
						<ul class="pagination">
							<li class="page-item">
								<a class="page-link" href="javascript:void(0)">
									<i class="fa fa-angle-left"></i>
								</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="javascript:void(0)">1</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="javascript:void(0)">2</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="javascript:void(0)">3</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="javascript:void(0)">4</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="javascript:void(0)">5</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="javascript:void(0)">
									<i class="fa fa-angle-right"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

```