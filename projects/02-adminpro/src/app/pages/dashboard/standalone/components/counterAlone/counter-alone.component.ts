import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'counter-alone',
	standalone: true,
	// imports: [CommonModule],
	template: `
		<h1>{{ title }} : {{ counter }}</h1>
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
	@Input() title: string = 'Counter';
	@Input('startIn') counter: number = 0;
	@Output() counterChanged: EventEmitter<string> = new EventEmitter();

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
		this.counterChanged.emit(
			`: Wow, that standalone component changed his parent. Counter changed to ${this.counter}`
		);
	}
}
