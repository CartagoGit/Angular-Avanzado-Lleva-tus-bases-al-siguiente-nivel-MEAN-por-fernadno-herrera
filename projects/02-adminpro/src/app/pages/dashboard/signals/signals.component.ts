import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { SignalsRoutingModule } from './signals.routing';

@Component({
	selector: 'app-signals',
	standalone: true,
	imports: [CommonModule, SignalsRoutingModule, NgFor],

	template: ` <div class="container">
		<div class="d-flex justify-content-around mb-3">
			<div class="buttons ">
				<span
					*ngFor="let route of menuRoutes"
					class="pointer btn btn-outline-secondary mr-2"
					[routerLink]="route.path"
				>
					{{ route.name }}</span
				>
			</div>
			<code class="pointer" routerLink="./">
				{{ phrase }}
			</code>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-12">
								<div class="card">
									<router-outlet />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`,
	styles: [],
})
export class SignalsComponent {
	public menuRoutes: { name: string; path: string }[] = [
		{ name: 'Counter', path: './counter' },
		{ name: 'Info', path: './info' },
		{ name: 'Properties', path: './properties' },
	];

	public phrase = 'The signals are strange tonight!';
}
