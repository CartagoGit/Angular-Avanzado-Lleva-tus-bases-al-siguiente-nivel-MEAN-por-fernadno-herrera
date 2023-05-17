import {
	Component,
	Signal,
	WritableSignal,
	inject,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSignalsService } from '../services/info-signals.service';

@Component({
	selector: 'app-user-info-page',
	standalone: true,
	imports: [CommonModule],
	template: `<div class="card-header d-flex justify-content-center">
			<h2>Info with signals and services</h2>
		</div>
		<div class="card-body d-flex flex-column align-items-center">
			<h3>Actual user : {{ actualUser() }}</h3>
			<div class="buttons d-flex g-10 mb-5">
				<button
					class="btn btn-primary"
					(click)="changeUser(actualUser() - 1)"
				>
					Previous
				</button>
				<button
					class="btn btn-primary"
					(click)="changeUser(this.initialUser())"
				>
					Initial
				</button>
				<button
					class="btn btn-primary"
					(click)="changeUser(actualUser() + 1)"
				>
					Next
				</button>
			</div>

			<h4 class="mb-2">User</h4>
			<div class="user d-flex flex-column">
				<p>Email:</p>
				<p>Name:</p>
				<img src="..." alt="Avatar" />
			</div>
			<div class="error">
				<h4 class="text-danger">User not found</h4>
			</div>
		</div>`,
	styles: [
		`
			.user {
				width: 350px;
				padding: 25px;
				border: 1px solid #ccc;
				border-radius: 5px;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
			}
		`,
	],
})
export class UserInfoPageComponent {
	// ANCHOR Variables
	public initialUser: Signal<number> = signal(1);
	public actualUser: WritableSignal<number> = signal(this.initialUser());
	private _infoSignalsSvc: InfoSignalsService = inject(InfoSignalsService);

	// ANCHOR Constructor
	constructor() {}

	// ANCHOR Methods
	public changeUser(id: number): void {
		this.actualUser.set(id);
		// this._infoSignalsSvc.getUserById(id).subscribe((res) => {
		// 	this.actualUser(res.id);
		// });
	}
}
