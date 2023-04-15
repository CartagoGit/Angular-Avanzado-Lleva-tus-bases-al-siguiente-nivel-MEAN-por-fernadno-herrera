import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { NewHospitalModalComponent } from './new-hospital-modal/new-hospital-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [ImageModalComponent, NewHospitalModalComponent],
	imports: [CommonModule, PipesModule, ReactiveFormsModule],
	exports: [ImageModalComponent],
})
export class ModalsModule {}
