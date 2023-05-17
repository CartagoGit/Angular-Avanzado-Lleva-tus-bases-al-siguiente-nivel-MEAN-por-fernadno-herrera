import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalsRoutingModule } from './signals.routing';
import { NavMenuComponent } from './components/nav-menu.component';
import { ContainerComponent } from './components/container.component';

@Component({
	selector: 'app-signals',
	standalone: true,
	imports: [
		CommonModule,
		SignalsRoutingModule,
		NavMenuComponent,
		ContainerComponent,
	],

	template: ` <div class="container">
		<div class="d-flex justify-content-around mb-3">
			<app-nav-menu />
			<code class="pointer" routerLink="./">
				{{ phrase }}
			</code>
		</div>
		<app-container>
			<router-outlet />
		</app-container>
	</div>`,

	styles: [],
})
export class SignalsComponent {
	public phrase = 'The signals are strange tonight!';
}
