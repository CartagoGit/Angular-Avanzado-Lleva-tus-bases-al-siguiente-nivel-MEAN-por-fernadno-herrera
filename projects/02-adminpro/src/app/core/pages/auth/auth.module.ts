import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../../../shared/shared.module';
import { TermsComponent } from './terms/terms.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent, TermsComponent],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
