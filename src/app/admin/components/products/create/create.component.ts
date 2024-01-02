import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/Product/create-product';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ProdcutService } from 'src/app/services/common/models/prodcut.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProdcutService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }
  ngOnInit(): void {}

  create(
    Name: HTMLInputElement,
    Stock: HTMLInputElement,
    Price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.Admin);
    const createProduct: CreateProduct = {
      name: Name.value,
      stock: parseInt(Stock.value),
      price: parseFloat(Price.value),
    };
    this.productService.createProduct(createProduct, () => {
      this.alertify.message('Ürün başarıyla eklendi.', {
        messageType: MessageType.Success,
        position: Position.BottomRight,
        dismissOther: true,
      });
      this.hideSpinner(SpinnerType.Admin);
    });
  }
}
