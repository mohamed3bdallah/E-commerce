import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}
  myToken: any = localStorage.getItem('token');
  cartCount: BehaviorSubject<number>  = new BehaviorSubject(0);
  addToCart(id: string): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      },
      {
        headers: {
          token: this.myToken,
        },
      }
    );
  }
  getLoged(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: this.myToken,
      },
    });
  }
  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: {
          token: this.myToken,
        },
      }
    );
  }
  updateProduct(id: string, quantity: number): Observable<any> {
    return this.httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

      {
        count: quantity,
      },
      {
        headers: {
          token: this.myToken,
        },
      }
    );
  }
  clearCart(): Observable<any> {
    return this.httpClient.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: this.myToken,
      },
    });
  }
}
