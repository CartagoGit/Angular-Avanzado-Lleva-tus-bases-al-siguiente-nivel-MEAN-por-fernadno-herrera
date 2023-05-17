import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-counter-page',
	standalone: true,
	imports: [CommonModule],
	template: `<p>counter-page works!</p>`,
	styles: [],
})
export class CounterPageComponent {}
