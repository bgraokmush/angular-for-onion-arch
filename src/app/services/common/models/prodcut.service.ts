import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/Product/create-product';

@Injectable({
  providedIn: 'root',
})
export class ProdcutService {
  constructor(private httpClientService: HttpClientService) {}

  createProduct(product: CreateProduct, successCallBack?: any) {
    return this.httpClientService
      .post<CreateProduct>(
        {
          controller: 'Product',
        },
        product
      )
      .subscribe((result) => {
        successCallBack();
      });
  }
}
