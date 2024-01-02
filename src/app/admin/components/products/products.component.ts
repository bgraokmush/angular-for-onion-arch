import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClient: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Admin);

    this.httpClient
      .get<Product[]>({ controller: 'Product' })
      .subscribe((data) => {
        console.log(data);
      });

    // this.httpClient
    //   .post(
    //     {
    //       controller: 'Product',
    //     },
    //     {
    //       name: 'Kalem Client',
    //       stock: 100,
    //       price: 120,
    //     }
    //   )
    //   .subscribe();

    // this.httpClient
    //   .put(
    //     {
    //       controller: 'Product',
    //     },
    //     {
    //       id: 'ed5b887b-1aa9-4aef-94a2-d807589161ab',
    //       name: 'Kalem Client Yeni',
    //       stock: 100,
    //       price: 120,
    //     }
    //   )
    //   .subscribe();

    // this.httpClient
    //   .delete(
    //     {
    //       controller: 'Product',
    //     },
    //     'ca13b11d-f5e1-4b4c-9403-7b8624f57aa6'
    //   )
    //   .subscribe();
  }
}
