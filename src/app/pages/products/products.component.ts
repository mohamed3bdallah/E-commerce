import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toaster = inject(ToastrService);
  products: IProduct[] = [];
  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addCart(id: string) {
    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toaster.success('Product added to cart successfully');
        this.cartService.cartCount.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },

    });
  }
  ngOnInit() {
    this.getProducts();
  }
}
