import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/Product/create-product';
import { HttpErrorResponse } from '@angular/common/http';
import { GetProduct } from 'src/app/contracts/Product/get-product';

@Injectable({
  providedIn: 'root',
})
export class ProdcutService {
  constructor(private httpClientService: HttpClientService) {}

  createProduct(
    product: CreateProduct,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: Array<string>) => void
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

  async getProducts(
    page: number = 0,
    size: number = 10,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; products: GetProduct[] }> {
    const promiseData: Promise<{ totalCount: number; products: GetProduct[] }> =
      this.httpClientService
        .get<{ totalCount: number; products: GetProduct[] }>({
          controller: 'Product',
          queryStrings: `page=${page}&size=${size}`,
        })
        .toPromise();

    promiseData
      .then((d) => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => {
        errorCallBack(errorResponse.message);
      });

    return await promiseData;
  }
}
