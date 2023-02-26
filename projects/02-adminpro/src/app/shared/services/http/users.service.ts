import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicHttp } from './models/basic-http.model';

const modelEndpoints = {
	isDoctor: '/is-doctor/',
	getDotors: '/get-doctors/',
	getHospitals: '/get-hospitals/',
};

@Injectable({
	providedIn: 'root',
})
export class UsersService extends BasicHttp {
	// ANCHOR : Variable

	// ANCHOR : Constructor
	constructor(private _http: HttpClient) {
		super({ modelEndpoints });
		console.log(this._endpoints);
	}

	public gola() {
		console.log(this);
	}
}
