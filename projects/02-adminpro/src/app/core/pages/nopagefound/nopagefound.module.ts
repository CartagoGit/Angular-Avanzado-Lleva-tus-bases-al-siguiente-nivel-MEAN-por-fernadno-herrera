import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoPageFoundComponent } from './nopagefound.component';
import { NopagefoundRoutingModule } from './nopagefound.routing';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [NoPageFoundComponent],
	imports: [CommonModule, NopagefoundRoutingModule],
})
export class NopagefoundModule {}
