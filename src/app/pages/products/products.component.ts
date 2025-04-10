import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-products',
  imports: [RouterLink , SearchPipe,],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toaster = inject(ToastrService);
  products: IProduct[] = [];
name: string="" ;
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
        this.cartService.cartCount.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },

    });
  }
  onclick(name: string) {
    this.name=name;
  }
  ngOnInit() {
    this.getProducts();
  }
}
