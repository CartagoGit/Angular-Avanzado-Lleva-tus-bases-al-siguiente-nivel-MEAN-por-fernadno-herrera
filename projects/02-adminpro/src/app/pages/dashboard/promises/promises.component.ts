import { Component } from '@angular/core';

@Component({
	selector: 'app-promesas',
	templateUrl: './promises.component.html',
	styles: [],
})
export class PromisesComponent {

	// ANCHOR - Constructor
	constructor() {}

	ngOnInit(): void {
		this.getUsersFromReqResIn().then((usuarios) => {
			console.log(usuarios);
		});
		// const promise = new Promise((resolve, reject) => {
		// 	if (false) resolve('Hola Mundo');
		// 	else reject('Algo salio mal');
		// });
		// promise
		// 	.then((val) => console.log(val))
		// 	.catch((err) => console.error('Error en mi promesa ->', err));
		// console.log('fin del init');
	}

	// ANCHOR Metodos


	/**
	 * ? Obtiene los usuarios de la API de reqres.in
	 * @public
	 * @returns {Promise<any>}
	 */
	public getUsersFromReqResIn(): Promise<any> {
		return new Promise((resolve) => {
			fetch('https://reqres.in/api/users')
				.then((resp) => resp.json())
				.then((body) => resolve(body.data));
		});
		// return promise;
	}
}
