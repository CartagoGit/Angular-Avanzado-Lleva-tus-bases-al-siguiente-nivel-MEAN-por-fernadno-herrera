import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
	{
		path: 'register',
		component: RegisterComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'terms',
		component: TermsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
