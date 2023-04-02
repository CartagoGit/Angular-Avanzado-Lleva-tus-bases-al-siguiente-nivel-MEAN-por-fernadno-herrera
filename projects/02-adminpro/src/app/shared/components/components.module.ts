import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementInputComponent } from './increment-input/increment-input.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';
import { FooterTableComponent } from './footer-table/footer-table.component';

@NgModule({
  declarations: [IncrementInputComponent, DonaComponent, FooterTableComponent],
  imports: [CommonModule, FormsModule , NgChartsModule],
  exports: [IncrementInputComponent, DonaComponent, FooterTableComponent],
})
export class ComponentsModule {}
