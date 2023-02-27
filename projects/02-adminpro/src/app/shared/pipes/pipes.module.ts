import { NgModule } from '@angular/core';
import { IsValidFieldPipe } from './is-valid-field.pipe';
import { CastPipe } from './cast.pipe';

@NgModule({
	declarations: [IsValidFieldPipe, CastPipe],
	imports: [],
	exports: [IsValidFieldPipe, CastPipe],
})
export class PipesModule {}
