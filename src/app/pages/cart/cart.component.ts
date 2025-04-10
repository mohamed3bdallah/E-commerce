import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  cartProducts:ICart = {} as ICart;
  getCart(){
    this.cartService.getLoged().subscribe({
      next: (res) => {
        this.cartProducts = res.data;
        console.log(this.cartProducts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteProd(id: string) {
    this.cartService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getCart();
        this.cartService.cartCount.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateProd(id: string, quantity: number) {
    this.cartService.updateProduct(id, quantity).subscribe({
      next: (res) => {
        console.log(res);
        this.cartProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this.getCart();
        this.cartService.cartCount.next(0);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit():void {
    this.getCart();
  }

}
