import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalsRoutingModule } from './signals.routing';

@Component({
	selector: 'app-signals',
	standalone: true,
	imports: [CommonModule, SignalsRoutingModule],

	template: ` <div class="container">
		<h2>Signals</h2>
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<router-outlet />
					</div>
				</div>
			</div>
		</div>
		<code class="d-flex justify-content-center">
			The signals are strange tonight!
		</code>
	</div>`,
	styles: [],
})
export class SignalsComponent {}
