import { NgModule } from '@angular/core';
import { IsValidFieldPipe } from './is-valid-field.pipe';
import { CastPipe } from './cast.pipe';
import { SanitizerPipe } from './sanitizer.pipe';
import { OrderByPipe } from './order-by.pipe';
import { IsActiveElement } from './is-active-element.pipe';

@NgModule({
	declarations: [
		IsValidFieldPipe,
		CastPipe,
		SanitizerPipe,
		OrderByPipe,
		IsActiveElement,
	],
	imports: [],
	exports: [
		IsValidFieldPipe,
		CastPipe,
		SanitizerPipe,
		OrderByPipe,
		IsActiveElement,
	],
})
export class PipesModule {}
