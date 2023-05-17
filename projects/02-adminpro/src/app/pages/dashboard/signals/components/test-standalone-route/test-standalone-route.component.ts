import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-test-standalone-route',
	standalone: true,
	imports: [CommonModule],
	template: `<p>
		Just a component for test route in standalone into another standalone
	</p>`,
	styles: [],
})
export class TestStandaloneRouteComponent {}
