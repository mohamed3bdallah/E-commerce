import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icaregory';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [CarouselModule , RouterLink],

templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 1800,
    autoplayMouseleaveTimeout: 1000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,

    autoWidth: true,
    items: 1,
    nav: false,
  };
  categoriesO: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 1800,
    autoplayMouseleaveTimeout: 1000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,

    autoWidth: true,
    items: 6,
    nav: false,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 6,
      },
    }
  };



  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
   private readonly CartService = inject(CartService);
   private readonly toaster = inject(ToastrService);
  products: IProduct[] = [];
  categories: ICategory[] = [];
  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
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
    this.CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toaster.success('Product added to cart successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
}
