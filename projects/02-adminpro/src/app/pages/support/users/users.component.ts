import { Component } from '@angular/core';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
})
export class UsersComponent {
	// ANCHOR - Variables
	public users: any[] = [];

	// ANCHOR - Constructor
	constructor() {
		this.users = [
			{
				name: 'John Doe',
				email: '	ada',
			},
		];
	}

	// ANCHOR - Methods
}
