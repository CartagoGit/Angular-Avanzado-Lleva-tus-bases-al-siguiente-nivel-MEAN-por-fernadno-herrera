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
	private _subscripcion: Subscription;

	constructor() {
		// this._retornaObservable().pipe(retry(5)).subscribe({
		this._subscripcion = this._retornaIntervalo()
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

	private _retornaIntervalo(): Observable<number> {
		return interval(100).pipe(
			// take(4),
			map((value) => value + 1),
			filter((valor) => valor % 2 === 0)
		);
		// return intervalo$;
	}

	private _retornaObservable(): Observable<number> {
		let i = -1;
		const obs$ = new Observable<number>((observer) => {
			const intervalo = setInterval(() => {
				i++;
				observer.next(i);
				if (i === 10) {
					clearInterval(intervalo);
					observer.complete();
				}
				if (i === 2) observer.error('Ha llegado a 2');
			}, 1000);
		});
		return obs$;
	}
}
