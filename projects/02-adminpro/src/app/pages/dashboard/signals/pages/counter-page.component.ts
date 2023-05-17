import {
	Component,
	Signal,
	WritableSignal,
	computed,
	effect,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-counter-page',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `<div class="card-header d-flex justify-content-center">
			<h2>Counter with signals</h2>
		</div>
		<div class="card-body d-flex flex-column align-items-center">
			<h3>Counter: {{ counter() }}</h3>
			<h4>Square counter: {{ squareCounter() }}</h4>
			<hr />

			<input
				type="number"
				class="d-flex form-control mb-2 w-auto"
				[ngModel]="num()"
				(ngModelChange)="num.set($event)"
			/>

			<div class="buttons d-flex g-10">
				<button class="btn btn-primary" (click)="changeCounter(-num())">
					-{{ num() }}
				</button>
				<button class="btn btn-primary" (click)="changeCounter(10, true)">
					Reset
				</button>
				<button class="btn btn-primary" (click)="changeCounter(num())">
					+{{ num() }}
				</button>
			</div>
		</div>`,
	styles: [],
})
export class CounterPageComponent {
	// ANCHOR Signals
	private _initialCounter: WritableSignal<number> = signal(10);
	public num: WritableSignal<number> = signal(1);
	public counter: WritableSignal<number> = signal(this._initialCounter());
	public squareCounter: Signal<number> = computed(() => this.counter() ** 2);

	// ANCHOR Constructor
	constructor() {
		// setTimeout(() => {
		// 	this._initialCounter.set(100);
		// }, 5000);

		// effect(() => {
		// 	console.log('inital counter changed', this._initialCounter());
		// 	this._initialCounter.set(2);
		// 	console.log('inital counter changed', this._initialCounter());

		// });
	}

	// ANCHOR Methods

	public changeCounter(num: number, reset?: boolean): void {
		if (reset) {
			this.counter.set(this._initialCounter());
			return;
		}
		this.counter.update((prev) => prev + num);
	}
}
