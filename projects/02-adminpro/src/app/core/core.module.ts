import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoPageFoundComponent } from './pages/nopagefound/nopagefound.component';
import { AuthModule } from './pages/auth/auth.module';



@NgModule({
  declarations: [NoPageFoundComponent],
  imports: [CommonModule, RouterModule, AuthModule],
  exports: [AuthModule, NoPageFoundComponent],
})
export class CoreModule {}
