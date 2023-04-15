import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementInputComponent } from './increment-input/increment-input.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';
import { FooterTableComponent } from './footer-table/footer-table.component';
import { ModalComponent } from './modal/modal.component';
import { InputFileComponent } from './input-file/input-file.component';

@NgModule({
	declarations: [
		IncrementInputComponent,
		DonaComponent,
		FooterTableComponent,
		ModalComponent,
		InputFileComponent,
	],
	imports: [CommonModule, FormsModule, NgChartsModule],
	exports: [
		IncrementInputComponent,
		DonaComponent,
		FooterTableComponent,
		ModalComponent,
		InputFileComponent
	],
})
export class ComponentsModule {}
