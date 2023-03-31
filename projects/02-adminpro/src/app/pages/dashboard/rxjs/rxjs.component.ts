import { Component } from '@angular/core';
import {
	filter,
	interval,
	map,
	Observable,
	retry,
	Subscription,
	take,
} from 'rxjs';

@Component({
	selector: 'app-rxjs',
	templateUrl: './rxjs.component.html',
	styles: [],
})
export class RxjsComponent {
	// ANCHOR - Variables
	private _subscripcion: Subscription;

	// ANCHOR - Constructor
	constructor() {
		// this._retornaObservable().pipe(retry(5)).subscribe({
		this._subscripcion = this._returnInterval()
			.pipe()
			.subscribe({
				next: (valor) => {
					console.log('1 Subs:', valor);
				},
				error: (error) => {
					console.warn('Error:', error);
				},
				complete: () => {
					console.log('Se Completo');
				},
			});
	}

	ngOnDestroy(): void {
		this._subscripcion.unsubscribe();
	}

	// ANCHOR - Methods



	/**
	 * ? Retorna un observable que emite un numero cada 100ms
	 * @private
	 * @returns {Observable<number>}
	 */
	private _returnInterval(): Observable<number> {
		return interval(100).pipe(
			// take(4),
			map((value) => value + 1),
			filter((valor) => valor % 2 === 0)
		);
		// return intervalo$;
	}



	/**
	 * ? Retorna un observable con un intervalo
	 * @private
	 * @returns {Observable<number>}
	 */
	private _returnObservable(): Observable<number> {
		let i = -1;
		const obs$ = new Observable<number>((observer) => {
			const interval = setInterval(() => {
				i++;
				observer.next(i);
				if (i === 10) {
					clearInterval(interval);
					observer.complete();
				}
				if (i === 2) observer.error('Ha llegado a 2');
			}, 1000);
		});
		return obs$;
	}
}
