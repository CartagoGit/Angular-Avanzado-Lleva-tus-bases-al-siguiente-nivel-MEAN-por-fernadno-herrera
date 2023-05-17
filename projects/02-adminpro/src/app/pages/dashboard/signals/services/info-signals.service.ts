import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';
@Injectable({
	providedIn: 'root',
})
export class InfoSignalsService {
	// ANCHOR Variables
	private _http = inject(HttpClient);
	private _baseUrl: string = 'https://reqres.in/api/users';

	//ANCHOR constructor
	constructor() {}

	// ANCHOR Methods
	public getUserById(id: string): Observable<User> {
		return this._http
			.get<SingleUserResponse>(`${this._baseUrl}/${id}`)
			.pipe(map((res) => res.data));
	}
}
