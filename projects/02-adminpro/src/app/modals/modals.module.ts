import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal/image-modal.component';

import { NewHospitalModalComponent } from './new-hospital-modal/new-hospital-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ImageModalComponent, NewHospitalModalComponent],
	imports: [CommonModule, ReactiveFormsModule, SharedModule],
	exports: [ImageModalComponent],
})
export class ModalsModule {}
