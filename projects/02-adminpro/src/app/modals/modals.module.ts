import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal/image-modal.component';

import { HospitalModalComponent } from './hospital-modal/hospital-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ImageModalComponent, HospitalModalComponent],
	imports: [CommonModule, ReactiveFormsModule, SharedModule],
	exports: [ImageModalComponent, HospitalModalComponent],
})
export class ModalsModule {}
