import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly toaster = inject(ToastrService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  product: IProduct = {} as IProduct;
  products: IProduct[] = [];

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

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let id: any = params.get('id');
        this.productsService.getSpecificProducts(id).subscribe({
          next: (res) => {
            this.product = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });


      this.productsService.getProducts().subscribe({
        next: (res) => {
          this.products = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
     // Adjust the delay as needed
  }
}
