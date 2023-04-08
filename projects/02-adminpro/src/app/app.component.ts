import { Component } from '@angular/core';
import { ModalService } from './shared/services/settings/modal.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	constructor(private _modalSvc: ModalService) {}
}
