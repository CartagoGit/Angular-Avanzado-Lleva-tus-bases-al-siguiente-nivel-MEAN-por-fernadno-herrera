import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paths } from '../../shared/constants/paths.constant';

const usersPath = paths.getPath('users');
const hospitalsPath = paths.getPath('hospitals');
const doctorsPath = paths.getPath('doctors');

const routes: Routes = [
	// {
		// path: usersPath?.name,

	// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
