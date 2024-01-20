import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css'],
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent> {
  debugger;
  constructor(
    dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmState
  ) {
    super(dialogRef);
  }
}

export enum ConfirmState {
  Yes,
  No,
}
