import { Injectable } from '@angular/core';
import { ToastrService as baseService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastr: baseService) {}

  message(
    message: string,
    title?: string,
    toastrOptions?: Partial<ToastrOptions>
  ) {
    this.toastr[toastrOptions.messageType](message, title, {
      positionClass: toastrOptions.position,
    });
  }
}

export enum MessageType {
  Success = 'success',
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
}

export enum MessagePosition {
  TopRight = 'toast-top-right',
  TopFullWidth = 'toast-top-full-width',
  TopLeft = 'toast-top-left',
  TopCenter = 'toast-top-center',
  BottomRight = 'toast-bottom-right',
  BottomFullWidth = 'toast-bottom-full-width',
  BottomLeft = 'toast-bottom-left',
  BottomCenter = 'toast-bottom-center',
}

export class ToastrOptions {
  messageType: MessageType = MessageType.Info;
  position: MessagePosition = MessagePosition.TopRight;
}
