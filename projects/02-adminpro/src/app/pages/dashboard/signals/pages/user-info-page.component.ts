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
			<div class="buttons d-flex g-10">
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
		</div>`,
	styles: [],
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
