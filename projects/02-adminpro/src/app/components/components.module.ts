import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementInputComponent } from './increment-input/increment-input.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [IncrementInputComponent, DonaComponent],
  imports: [CommonModule, FormsModule , NgChartsModule],
  exports: [IncrementInputComponent, DonaComponent],
})
export class ComponentsModule {}
