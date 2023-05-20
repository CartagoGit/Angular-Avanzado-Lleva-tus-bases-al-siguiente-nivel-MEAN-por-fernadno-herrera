import { NgModule } from '@angular/core';
import { IsValidFieldPipe } from './is-valid-field.pipe';
import { CastPipe } from './cast.pipe';
import { SanitizerPipe } from './sanitizer.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
	declarations: [IsValidFieldPipe, CastPipe, SanitizerPipe, OrderByPipe],
	imports: [],
	exports: [IsValidFieldPipe, CastPipe, SanitizerPipe, OrderByPipe],
})
export class PipesModule {}
