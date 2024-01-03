import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { GetProduct } from 'src/app/contracts/Product/get-product';
import { MatPaginator } from '@angular/material/paginator';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ProdcutService } from 'src/app/services/common/models/prodcut.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProdcutService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updateDate',
  ];

  dataSource: MatTableDataSource<GetProduct> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.Admin);
    const allProducts: { totalCount: number; products: GetProduct[] } =
      await this.productService.getProducts(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 10,
        () => {
          this.hideSpinner(SpinnerType.Admin);
        },
        (errorMessage: string) => {
          this.alertify.message(errorMessage, {
            messageType: MessageType.Error,
            position: Position.BottomRight,
            dismissOther: false,
            delay: 5,
          });
        }
      );

    this.dataSource = new MatTableDataSource<GetProduct>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }

  async pageChanged() {
    await this.getProducts();
  }
  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }
}
