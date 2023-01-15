import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementInputComponent } from './increment-input/increment-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IncrementInputComponent],
  imports: [CommonModule, FormsModule],
  exports: [IncrementInputComponent],
})
export class ComponentsModule {}
