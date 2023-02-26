import { Injectable } from '@angular/core';
import { BasicHttp } from './models/basic-http.model';

const modelEndpoints = {
	isDoctor: '/is-doctor/',
	getDoctors: '/get-doctors/',
	getHospitals: '/get-hospitals/',
};

const modelRouteEndpoint = '/users';

@Injectable({
	providedIn: 'root',
})
export class UsersService extends BasicHttp {
	// ANCHOR : Variable

	// ANCHOR : Constructor
	constructor() {
		super({ modelEndpoints, modelRouteEndpoint });
		console.log(this._endpoints);
	}

	public gola() {
		console.log(this);
		// this._http.
		// this._http.get('http://localhost:5000').subscribe({
		// 	next: (data) => {

		// 		console.log(data);
		// 	},
		// });
		window.open('http://localhost:5000');
	}
}
