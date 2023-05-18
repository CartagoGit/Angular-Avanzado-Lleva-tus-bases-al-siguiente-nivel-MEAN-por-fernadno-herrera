import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-properties-page',
	standalone: true,
	imports: [CommonModule],
	template: ` <div class="card-header d-flex justify-content-center">
			<h2>Properties and mutations with signals</h2>
		</div>
		<div class="card-body d-flex flex-column align-items-center">
			<div class="row">
				<div class="col-6 d-flex flex-column g-15">
					<input
						#txtEmail
						type="text"
						class="form-control"
						(input)="onFieldUpdated('email', txtEmail.value)"
					/>
					<input
						#txtFirstName
						type="text"
						class="form-control"
						(input)="onFieldUpdated('firstName', txtFirstName.value)"
					/>
					<input
						#txtLastName
						type="text"
						class="form-control"
						(input)="onFieldUpdated('lastName', txtLastName.value)"
					/>
				</div>

				<div class="col-6">
					<pre>{{ 0 }}</pre>
				</div>
			</div>
		</div>`,
	styles: [],
})
export class PropertiesPageComponent {
	// ANCHOR : Variables

	// ANCHOR : Constructor
	constructor() {}

	// ANCHOR : Methods
	public onFieldUpdated(
		field: 'email' | 'firstName' | 'lastName',
		value: string
	): void {
		console.log(field, value);
	}
}
