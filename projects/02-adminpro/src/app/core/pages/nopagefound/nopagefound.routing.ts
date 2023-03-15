import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './nopagefound.component';
import { paths } from '../../../shared/constants/paths.constant';

const routes: Routes = [
	{ path: '', component: NoPageFoundComponent, pathMatch: 'full' },
	{ path: '**', redirectTo: paths.getPath('no-page-found')?.fullPath! },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class NopagefoundRoutingModule {}
