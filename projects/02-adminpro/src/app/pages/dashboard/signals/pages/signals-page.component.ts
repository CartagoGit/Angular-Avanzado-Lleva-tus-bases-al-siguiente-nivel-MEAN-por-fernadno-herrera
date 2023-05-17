import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	standalone: true,
	imports: [CommonModule],
	template: ` <div class="card-header d-flex justify-content-center">
			<h2>Main Signals Page</h2>
		</div>
		<div class="card-body d-flex flex-column align-items-center">
			<p>In this page we will practice with the new feature of Angular 16</p>
			<p>
				The new way for working with reactive Angular pages: the 'Signals'
			</p>
		</div>`,
})
export class SignalsPageComponent {

}
