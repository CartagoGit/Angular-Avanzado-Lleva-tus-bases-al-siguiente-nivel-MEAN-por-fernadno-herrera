import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignalsRoutingModule } from './signals.routing';

@Component({
	selector: 'app-signals',
	standalone: true,
	imports: [CommonModule, SignalsRoutingModule, RouterModule],
	template: `<p>signals works!</p>
		<router-outlet /> `,
	styles: [],
})
export class SignalsComponent {}
