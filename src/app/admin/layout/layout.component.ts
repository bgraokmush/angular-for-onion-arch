import { Component, OnInit } from '@angular/core';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private alertifyService: AlertifyService) {}
  ngOnInit(): void {
    this.alertifyService.message('Hoş Geldiniz!', {
      messageType: MessageType.Notify,
      position: Position.BottomRight,
      delay: 3,
      dismissOther: false,
    });
  }
}
