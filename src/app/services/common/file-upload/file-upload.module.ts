import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxFileDropModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
  ],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
