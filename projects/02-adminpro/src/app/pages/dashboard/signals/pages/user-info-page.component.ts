import {
	Component,
	Signal,
	WritableSignal,
	computed,
	inject,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSignalsService } from '../services/info-signals.service';
import { User } from '../interfaces/user-request.interface';

@Component({
	selector: 'app-user-info-page',
	standalone: true,
	imports: [CommonModule],
	template: `<div class="card-header d-flex justify-content-center">
			<h2>Info with signals and services</h2>
		</div>
		<div class="card-body d-flex flex-column align-items-center">
			<h3>Actual user Id: {{ actualUserId() }}</h3>
			<div class="buttons d-flex g-10 mb-5">
				<button
					class="btn btn-primary"
					(click)="changeUser(actualUserId() - 1)"
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
					(click)="changeUser(actualUserId() + 1)"
				>
					Next
				</button>
			</div>

			<div class="user" *ngIf="actualUser(); else error">
				<h4 class="mb-2">User</h4>
				<div class="user-info d-flex flex-column">
					<p>Email: {{ actualUser()?.email }}</p>
					<p>Name: {{ fullName() }}</p>
					<img [src]="actualUser()?.avatar" alt="Avatar" />
				</div>
			</div>
			<ng-template #error>
				<div class="error">
					<div class="text-danger">User not found</div>
				</div>
			</ng-template>
		</div>`,
	styles: [
		`
			.user-info {
				width: 350px;
				padding: 25px;
				border: 1px solid #ccc;
				border-radius: 5px;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
			}

			.error {
				font-size: 20px;
				font-weight: 600;
				display: grid;
				place-items: center;
				padding: 10px;
				outline: 2px dashed red;
				border-radius: 5px;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
			}
		`,
	],
})
export class UserInfoPageComponent {
	// ANCHOR Variables
	public initialUser: Signal<number> = signal(1);
	public actualUserId: WritableSignal<number> = signal(this.initialUser());
	public actualUser: WritableSignal<User | undefined> = signal(undefined);
	public fullName: Signal<string> = computed(
		() => `${this.actualUser()?.first_name} ${this.actualUser()?.last_name}`
	);

	private _infoSignalsSvc: InfoSignalsService = inject(InfoSignalsService);

	// ANCHOR Constructor
	constructor() {
		this.changeUser(this.actualUserId());
	}

	// ANCHOR Methods
	public changeUser(id: number): void {
		this.actualUserId.set(id);
		this._infoSignalsSvc.getUserById(id.toString()).subscribe({
			next: (user) => {
				this.actualUser.set(user);
			},
			error: () => {
				this.actualUser.set(undefined);
			},
		});
	}
}
