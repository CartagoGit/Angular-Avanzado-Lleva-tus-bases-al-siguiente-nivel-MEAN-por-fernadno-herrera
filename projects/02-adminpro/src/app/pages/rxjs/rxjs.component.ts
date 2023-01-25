import { Component } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Component({
	selector: 'app-rxjs',
	templateUrl: './rxjs.component.html',
	styles: [],
})
export class RxjsComponent {
	constructor() {
		let i = -1;
		const obs$ = new Observable((observer) => {
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

		obs$.pipe(
			retry(5)
		).subscribe({
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
}
