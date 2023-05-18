import {
	ChangeDetectionStrategy,
	Component,
	WritableSignal,
	computed,
	effect,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user-request.interface';

@Component({
	selector: 'app-properties-page',
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <div class="card-header d-flex justify-content-center">
			<h2>Properties and mutations with signals</h2>
		</div>
		<div class="card-body d-flex flex-column align-items-center">
			<div class="row">
				<div class="col-6 d-flex flex-column g-15">
					<div class="input-info d-flex flex-column g-10">
						<span>Email: </span>
						<input
							#txtEmail
							type="text"
							class="form-control"
							(input)="onFieldUpdated('email', txtEmail.value)"
							[value]="user().email"
						/>
					</div>
					<div class="input-info d-flex flex-column g-10">
						<span>First Name</span>
						<input
							#txtFirstName
							type="text"
							class="form-control"
							(input)="onFieldUpdated('first_name', txtFirstName.value)"
							[value]="user().first_name"
						/>
					</div>
					<div class="input-info d-flex flex-column g-10">
						<span>Last Name</span>
						<input
							#txtLastName
							type="text"
							class="form-control"
							(input)="onFieldUpdated('last_name', txtLastName.value)"
							[value]="user().last_name"
						/>
					</div>
				</div>

				<div class="col-6">
					<pre>{{ user() | json }}</pre>
					<span>Full name: {{ fullName() }}</span>
				</div>
			</div>
		</div>`,
	styles: [],
})
export class PropertiesPageComponent {
	// ANCHOR : Variables
	public user: WritableSignal<User> = signal({
		avatar: 'https://reqres.in/img/faces/1-image.jpg',
		email: 'george.bluth@reqres.in',
		first_name: 'George',
		id: 1,
		last_name: 'Bluth',
	});

	public fullName = computed(() => {
		return `${this.user().first_name} ${this.user().last_name}`;
	});

	public signalCounter = signal(0);

	public counter = 0;
	public userChangedEffect = effect(
		() => {
			this.counter++;
			this.signalCounter.update((current) => current + 1);
			console.log(`User changed ${this.counter} times`, this.user());
			console.log(`Signal modified inside effect ${this.signalCounter()}`);
		},
		{ allowSignalWrites: true }
	);

	// ANCHOR : Constructor
	constructor() {}

	ngOnDestroy(): void {
		// * Se pueden destruir los efectos manualmente aunque por si mismos se destruyen al destruir el componente
		// this.userChangedEffect.destroy();
	}

	// ANCHOR : Methods
	public onFieldUpdated(field: keyof User, value: string): void {
		// console.log(field, value);
		this.user.update((user) => ({ ...user, [field]: value }));
		// this.user.mutate((current) => {
		// current.email = value;
		// console.log(current, value, field);
		// current = { ...current, [field]: value };
		// current[field] = value as any;

		// });
	}
}
