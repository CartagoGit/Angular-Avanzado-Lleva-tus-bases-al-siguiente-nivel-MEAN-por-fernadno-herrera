import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
	declarations: [ImageModalComponent],
	imports: [CommonModule, PipesModule],
	exports: [ImageModalComponent],
})
export class ModalsModule {}
