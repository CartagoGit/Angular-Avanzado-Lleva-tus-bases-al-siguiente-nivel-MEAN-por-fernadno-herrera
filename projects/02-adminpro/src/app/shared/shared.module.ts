import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from './components/components.module';
import { ContainerModule } from './container/container.module';



@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, ComponentsModule, ContainerModule],
  exports: [ComponentsModule, ContainerModule],
})
export class SharedModule {}
