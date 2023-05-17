import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalsRoutingModule } from './signals.routing';

@Component({
	selector: 'app-signals',
	standalone: true,
	imports: [CommonModule, SignalsRoutingModule],

	template: ` <div class="container">
		<div class="d-flex justify-content-around mb-3">
			<div class="buttons ">
				<span
					class="pointer btn btn-outline-primary mr-2"
					routerLink="./counter"
				>
					Counter
				</span>
				<span class="pointer btn btn-outline-primary mr-2" routerLink="./info">
					Info
				</span>
				<span
					class="pointer btn btn-outline-primary"
					routerLink="./properties"
				>
					Properties
				</span>
			</div>

			<code class="pointer" routerLink="./"
				>The signals are strange tonight!</code
			>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<router-outlet />
					</div>
				</div>
			</div>
		</div>
	</div>`,
	styles: [],
})
export class SignalsComponent {}
