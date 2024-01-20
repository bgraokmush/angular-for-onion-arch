import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { data, error } from 'jquery';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete.dialog/delete.dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProdcutService } from 'src/app/services/common/models/prodcut.service';
declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    // Button öğesini oluştur
    const button = this.renderer.createElement('button');

    // Button'a gerekli sınıfları ve özellikleri ekle
    this.renderer.setAttribute(button, 'mat-icon-button', '');
    this.renderer.setAttribute(button, 'color', 'accent');
    this.renderer.setAttribute(button, 'aria-label', 'Delete Product');
    this.renderer.addClass(button, 'mat-mdc-tooltip-trigger');
    this.renderer.addClass(button, 'mdc-icon-button');
    this.renderer.addClass(button, 'mat-mdc-icon-button');
    this.renderer.addClass(button, 'mat-accent');
    this.renderer.addClass(button, 'mat-mdc-button-base');
    this.renderer.addClass(button, 'mat-ripple-loader-class-name');
    this.renderer.addClass(button, 'mat-mdc-button-ripple');
    this.renderer.addClass(button, 'mat-ripple-loader-centered');
    this.renderer.addClass(button, 'mat-mdc-focus-indicator');
    this.renderer.addClass(button, 'mat-mdc-button-touch-target');

    // Mat-icon öğesini oluştur
    const matIcon = this.renderer.createElement('mat-icon');
    this.renderer.addClass(matIcon, 'mat-icon');
    this.renderer.addClass(matIcon, 'notranslate');
    this.renderer.addClass(matIcon, 'material-icons');
    this.renderer.addClass(matIcon, 'mat-ligature-font');
    this.renderer.addClass(matIcon, 'mat-icon-no-color');
    matIcon.textContent = 'delete';

    // MatTooltip direktifi ile tooltip ekleyin
    const tooltipDirective = this.renderer.createElement('div');
    this.renderer.setAttribute(tooltipDirective, 'matTooltip', 'Delete');
    this.renderer.setAttribute(tooltipDirective, 'matTooltipPosition', 'above');
    this.renderer.appendChild(button, tooltipDirective);

    // Span öğelerini oluştur
    const rippleSpan = this.renderer.createElement('span');
    this.renderer.addClass(rippleSpan, 'mat-mdc-button-persistent-ripple');
    this.renderer.addClass(rippleSpan, 'mdc-icon-button__ripple');

    const focusIndicatorSpan = this.renderer.createElement('span');
    this.renderer.addClass(focusIndicatorSpan, 'mat-mdc-focus-indicator');

    const touchTargetSpan = this.renderer.createElement('span');
    this.renderer.addClass(touchTargetSpan, 'mat-mdc-button-touch-target');

    const rippleSpan2 = this.renderer.createElement('span');
    this.renderer.addClass(rippleSpan2, 'mat-ripple');
    this.renderer.addClass(rippleSpan2, 'mat-mdc-button-ripple');

    // Button'a Mat-icon ve diğer öğeleri ekle
    this.renderer.appendChild(button, rippleSpan);
    this.renderer.appendChild(button, matIcon);
    this.renderer.appendChild(button, focusIndicatorSpan);
    this.renderer.appendChild(button, touchTargetSpan);
    this.renderer.appendChild(button, rippleSpan2);

    // Button'u component içindeki elemente ekle
    this.renderer.appendChild(this.element.nativeElement, button);
  }

  @Input() id: string;
  @Input() controller: string;

  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        const td: HTMLTableElement = this.element.nativeElement.parentNode;
        this.httpClientService
          .delete<any>(
            {
              controller: this.controller,
            },
            this.id
          )
          .subscribe(
            (data) => {
              $(td).fadeOut(300, () => {
                this.callback.emit();
                this.alertifyService.message('Ürün başarıyla silindi. ', {
                  messageType: MessageType.Success,
                  dismissOther: false,
                });
              });
            },
            (errorResponse: HttpErrorResponse) => {
              errorResponse.message.split('\n').forEach((v) => {
                this.alertifyService.message(v, {
                  messageType: MessageType.Error,
                  dismissOther: false,
                });
              });
            }
          );
      },
    });
  }
}
