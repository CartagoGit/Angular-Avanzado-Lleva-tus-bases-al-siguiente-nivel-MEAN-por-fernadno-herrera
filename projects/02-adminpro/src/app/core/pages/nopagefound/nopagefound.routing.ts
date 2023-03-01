import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './nopagefound.component';

const routes: Routes = [{ path: '', component: NoPageFoundComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class NopagefoundRoutingModule {}
