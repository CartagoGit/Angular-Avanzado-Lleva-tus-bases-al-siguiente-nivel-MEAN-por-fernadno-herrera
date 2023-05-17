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
		<app-nav-menu />

		<app-container>
			<router-outlet />
		</app-container>
	</div>`,

	styles: [],
})
export class SignalsComponent {}
