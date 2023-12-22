import { Component, OnInit } from '@angular/core';
declare var alertify: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  OnInit(): void {
    alertify.success('test');
  }
}
