import { Component } from '@angular/core';
import {
  MessagePosition,
  MessageType,
  ToastrService,
} from 'src/app/services/client/toastr.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(private toastrService: ToastrService) {}
}
