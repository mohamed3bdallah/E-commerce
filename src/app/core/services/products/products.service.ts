import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsCache$: Observable<any> | null = null;
  private productDetailsCache: { [key: string]: Observable<any> } = {};

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<any>{
    if (!this.productsCache$) {
      this.productsCache$ = this.httpClient.get('https://ecommerce.routemisr.com/api/v1/products')
        .pipe(shareReplay(1));
    }
    return this.productsCache$;
  }

  getSpecificProducts(id:string):Observable<any>{
    if (!this.productDetailsCache[id]) {
      this.productDetailsCache[id] = this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .pipe(shareReplay(1));
    }
    return this.productDetailsCache[id];
  }
}
