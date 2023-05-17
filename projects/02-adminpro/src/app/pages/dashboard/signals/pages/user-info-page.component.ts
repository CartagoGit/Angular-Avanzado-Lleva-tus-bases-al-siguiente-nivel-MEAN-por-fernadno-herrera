import {
	ChangeDetectionStrategy,
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
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule],
	template: `<div class="card-header d-flex justify-content-center">
			<h2>Info with signals and services</h2>
		</div>
		<div class="card-body d-flex flex-column align-items-center">
			<h3>Actual user Id: {{ currentUserId() }}</h3>
			<div class="buttons d-flex g-10 mb-5">
				<button
					class="btn btn-primary"
					(click)="changeUser(currentUserId() - 1)"
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
					(click)="changeUser(currentUserId() + 1)"
				>
					Next
				</button>
			</div>

			<div class="user" *ngIf="isUserFound(); else error">
				<h4 class="mb-2">User</h4>
				<div class="user-info d-flex flex-column">
					<p>Email: {{ currentUser()?.email }}</p>
					<p>Name: {{ fullName() }}</p>
					<img
						[src]="currentUser()?.avatar"
						alt="Avatar"
						class="rounded"
					/>
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
	public isUserFound: WritableSignal<boolean> = signal(true);
	public currentUserId: WritableSignal<number> = signal(this.initialUser());
	public currentUser: WritableSignal<User | undefined> = signal(undefined);
	public fullName: Signal<string> = computed(
		() => `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
	);

	private _infoSignalsSvc: InfoSignalsService = inject(InfoSignalsService);

	// ANCHOR Constructor
	constructor() {}

	ngOnInit(): void {
		this.changeUser(this.currentUserId());
	}

	// ANCHOR Methods
	public changeUser(id: number): void {
		this.currentUserId.set(id);
		this._infoSignalsSvc.getUserById(id.toString()).subscribe({
			next: (user) => {
				this.currentUser.set(user);
				this.isUserFound.set(true);
			},
			error: () => {
				this.currentUser.set(undefined);
				this.isUserFound.set(false);
			},
		});
	}
}
