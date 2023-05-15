import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'counter-alone',
	standalone: true,
	// imports: [CommonModule],
	template: `
		<h1>Counter {{ counter }}</h1>
		<div class="buttons">
			<button class="btn btn-primary" (click)="clickCounter(-1)">-1</button>
			<button class="btn btn-primary" (click)="clickCounter(1)">+1</button>
		</div>
	`,
	styles: [
		`
			.buttons {
				display: flex;
				gap: 10px;
			}
		`,
	],
})
export class CounterAloneComponent {
	// ANCHOR : Variables
	public counter: number = 0;

	// ANCHOR : Constructor

	constructor() {}

	// ANCHOR : Methods

	/**
	 * ? Suma o resta el valor
	 * @public
	 * @param {number} num
	 */
	public clickCounter(num: number): void {
		this.counter += num;
	}
}
