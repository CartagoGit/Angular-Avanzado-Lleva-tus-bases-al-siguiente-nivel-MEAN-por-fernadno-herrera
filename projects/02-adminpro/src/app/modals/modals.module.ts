import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal/image-modal.component';

import { HospitalModalComponent } from './hospital-modal/hospital-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DoctosOfHospitalModalComponent } from './doctos-of-hospital-modal/doctos-of-hospital-modal.component';

@NgModule({
	declarations: [
		ImageModalComponent,
		HospitalModalComponent,
		DoctosOfHospitalModalComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, SharedModule],
	exports: [
		ImageModalComponent,
		HospitalModalComponent,
		DoctosOfHospitalModalComponent,
	],
})
export class ModalsModule {}
