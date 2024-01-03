import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/Product/create-product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdcutService {
  constructor(private httpClientService: HttpClientService) {}

  createProduct(
    product: CreateProduct,
    successCallBack?: any,
    errorCallBack?: any
  ) {
    return this.httpClientService
      .post<CreateProduct>(
        {
          controller: 'Product',
        },
        product
      )
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += _v + '@@';
            });
          });
          //convert message to array
          let result: Array<string> = message.split('@@');
          errorCallBack(result);
        }
      );
  }
}
