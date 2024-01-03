import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(type: SpinnerType) {
    this.spinner.show(type);

    setTimeout(() => {
      this.hideSpinner(type);
    }, 1000);
  }

  hideSpinner(type: SpinnerType) {
    this.spinner.hide(type);
  }
}

export enum SpinnerType {
  Admin = 'admin',
  Client = 'client',
}
