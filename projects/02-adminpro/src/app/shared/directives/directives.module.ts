import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgErrorDirective } from './img-error.directive';

@NgModule({
	declarations: [ImgErrorDirective],
	imports: [CommonModule],
	exports: [ImgErrorDirective],
})
export class DirectivesModule {}
