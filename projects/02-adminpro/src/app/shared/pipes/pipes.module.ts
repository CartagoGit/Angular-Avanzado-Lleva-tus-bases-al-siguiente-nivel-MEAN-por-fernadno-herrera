import { NgModule } from '@angular/core';
import { IsValidFieldPipe } from './is-valid-field.pipe';
import { CastPipe } from './cast.pipe';
import { SanitizerPipe } from './sanitizer.pipe';

@NgModule({
	declarations: [IsValidFieldPipe, CastPipe, SanitizerPipe],
	imports: [],
	exports: [IsValidFieldPipe, CastPipe, SanitizerPipe],
})
export class PipesModule {}
