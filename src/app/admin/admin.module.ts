import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { DialogsModule } from '../dialogs/dialogs.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LayoutModule, DialogsModule],
  exports: [LayoutModule, ComponentsModule],
})
export class AdminModule {}
