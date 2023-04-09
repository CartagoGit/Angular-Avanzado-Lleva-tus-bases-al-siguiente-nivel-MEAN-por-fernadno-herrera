import { Component } from '@angular/core';
import { User } from '../../shared/models/mongo-models/user.model';
import { PipesModule } from '../../shared/pipes/pipes.module';

@Component({
	selector: 'app-image-modal',
	templateUrl: './image-modal.component.html',
	styleUrls: ['./image-modal.component.css'],
	standalone: true,
	imports: [PipesModule],
})
export class ImageModalComponent {
	public data: User = {} as User;
	constructor() {
		console.log(0, this.data);
	}
	ngOnInit(): void {
		console.log(1, this.data);
	}
	ngAfterViewInit(): void {
		console.log(2, this.data);
	}

	public close(): void {
		console.log(3, this.data);
		console.log('jauri');
	}
}
