import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal/image-modal.component';

import { HospitalModalComponent } from './hospital-modal/hospital-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DoctorsOfHospitalModalComponent } from './doctos-of-hospital-modal/doctors-of-hospital-modal.component';
import { DoctorModalComponent } from './doctor-modal/doctor-modal.component';

@NgModule({
	declarations: [
		ImageModalComponent,
		HospitalModalComponent,
		DoctorsOfHospitalModalComponent,
		DoctorModalComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, SharedModule],
	exports: [
		ImageModalComponent,
		HospitalModalComponent,
		DoctorsOfHospitalModalComponent,
	],
})
export class ModalsModule {}
