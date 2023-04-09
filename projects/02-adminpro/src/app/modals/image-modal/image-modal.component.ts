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
	console.log(0,this.data);
  }
ngOnInit(): void {
	//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
	//Add 'implements OnInit' to the class.
	console.log(1,this.data);
}
  ngAfterViewInit(): void {
	//Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
	//Add 'implements AfterViewInit' to the class.
	console.log(2,this.data);
  }

}
