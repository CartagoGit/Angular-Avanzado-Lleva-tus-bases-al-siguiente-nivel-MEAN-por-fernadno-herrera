import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalsRoutingModule } from './signals.routing';

@Component({
	selector: 'app-signals',
	standalone: true,
	imports: [CommonModule, SignalsRoutingModule],

	template: `<p>signals works!</p>
		<router-outlet />
		eoo`,
	styles: [],
})
export class SignalsComponent {}
