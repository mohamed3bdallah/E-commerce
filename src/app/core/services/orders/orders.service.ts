import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}
  myToken: any = localStorage.getItem('token');
  checkoutPayment(id: string, data: any) {
    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{
        "shippingAddress": data
    },
      {
        headers: {
          token: this.myToken,
        },
      }
    );



  }
}
