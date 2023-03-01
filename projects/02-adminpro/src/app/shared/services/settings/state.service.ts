import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StateService {
	public isMaintenance: boolean = false;
	public isFinishedMaintenance: boolean = true;
	public isAuthenticated: boolean = false;

	constructor() {}
}
