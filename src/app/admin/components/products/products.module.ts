import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete.dialog/delete.dialog.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,
    DeleteDirective,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    RouterModule.forChild([{ path: '', component: ProductsComponent }]),
  ],
})
export class ProductsModule {}
