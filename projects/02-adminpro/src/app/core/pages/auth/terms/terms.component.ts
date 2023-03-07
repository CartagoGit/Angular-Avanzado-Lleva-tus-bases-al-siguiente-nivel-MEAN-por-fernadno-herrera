import { Component } from '@angular/core';
import { paths } from 'projects/02-adminpro/src/app/shared/constants/paths.constant';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent {
	public registerPath = paths.getPath('register');

}
