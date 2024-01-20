import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import {
  AlertifyService,
  MessageType as alertifyType,
} from '../../admin/alertify.service';
import {
  ToastrService,
  MessageType as toastrType,
} from '../../client/toastr.service';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { data, error } from 'jquery';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;
  constructor(
    private alertify: AlertifyService,
    private toasterService: ToastrService,
    private httpClientService: HttpClientService
  ) {}

  checked = true;

  get className(): string {
    return !this.checked
      ? 'ngx-file-drop__drop-zone--disabled'
      : 'ngx-file-drop__drop-zone--enabled';
  }

  onChange(event: any): void {
    this.checked = event.target.checked;
  }

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((_file: File) => {
          fileData.append(_file.name, _file, droppedFile.relativePath);
        });

        this.httpClientService
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryStrings: this.options.queryStrings,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe(
            (data) => {
              if (this.options.isAdminPage) {
                this.alertify.message('Dosyalar başarıyla yüklendi.', {
                  messageType: alertifyType.Success,
                });
              } else {
                this.toasterService.message(
                  'Dosyalar başarıyla yüklendi.',
                  'Başarılı',
                  {
                    messageType: toastrType.Success,
                  }
                );
              }
            },
            (errorResponse: HttpErrorResponse) => {
              if (this.options.isAdminPage) {
                this.alertify.message('Dosyalar Yüklenemedi.', {
                  messageType: alertifyType.Error,
                });
              } else {
                this.toasterService.message(
                  errorResponse.message,
                  'Dosyalar Yüklenemedi.',
                  {
                    messageType: toastrType.Error,
                  }
                );
              }
            }
          );
      } else {
        if (this.options.isAdminPage) {
          this.alertify.message('Format desteklenmiyor.', {
            messageType: alertifyType.Warning,
          });
        } else {
          this.toasterService.message('Format desteklenmiyor.', 'Hata', {
            messageType: toastrType.Warning,
          });
        }
      }
    }
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryStrings?: string;
  explanation?: string;
  accept?: string;
  isAdminPage: boolean = false;
}
