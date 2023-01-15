import { Component } from '@angular/core';
import { ColorBootstrap } from '../../interfaces/color.interface';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  public example01: ColorBootstrap = 'primary';
  public example02: ColorBootstrap = 'info';

  public initProgress01 = 15;
  public initProgress02 = 30;

  public progress01: string = this.initProgress01 + '%';
  public progress02: string = this.initProgress02 + '%';
}
