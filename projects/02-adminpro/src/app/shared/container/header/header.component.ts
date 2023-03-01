import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/settings/storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [],
})
export class HeaderComponent {
	constructor(private _storageSvc: StorageService, private _router: Router) {}

	public logout(): void {
		this._storageSvc.local.delete('token');
		this._router.navigate(['/login']);
	}
}
