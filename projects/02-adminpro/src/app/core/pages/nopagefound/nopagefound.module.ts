import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoPageFoundComponent } from './nopagefound.component';
import { NopagefoundRoutingModule } from './nopagefound.routing';

@NgModule({
	declarations: [NoPageFoundComponent],
	imports: [CommonModule, NopagefoundRoutingModule],
})
export class NopagefoundModule {}
