import { Component } from '@angular/core';
import { User } from '../../shared/models/mongo-models/user.model';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ModalService } from '../../shared/services/settings/modal.service';

@Component({
	selector: 'app-image-modal',
	templateUrl: './image-modal.component.html',
	styleUrls: ['./image-modal.component.css'],
	standalone: true,
	imports: [PipesModule],
})
export class ImageModalComponent {
	//* se recupera al crear la instancia del modal
	public data: User = {} as User;
	constructor(private _modalSvc: ModalService) {}

	ngOnInit(): void {}

	public close(): void {
		this._modalSvc.close({ jauri: 'kiki' });
	}
}
