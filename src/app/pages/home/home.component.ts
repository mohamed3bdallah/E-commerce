import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icaregory';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchPipe } from '../../shared/pipes/search.pipe';


@Component({
  selector: 'app-home',
  imports: [CarouselModule , RouterLink,SearchPipe ],

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
  private readonly ngxSpinnerService =inject(NgxSpinnerService)
  products: IProduct[] = [];
  categories: ICategory[] = [];
  name: string = '';
  active:string ='';
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
    this.ngxSpinnerService.show('loading');
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.ngxSpinnerService.hide('loading');
        console.log(this.products);
      },
      error: (err) => {
        console.log(err);
        this.ngxSpinnerService.hide('loading');
      },
    });
  }
  addCart(id: string) {
    this.CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toaster.success('Product added to cart successfully');
        this.CartService.cartCount.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onclick(name: string) {
    this.name=name;
    this.putActive(name);
  }
putActive(name:string){
  this.active=name;
}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
}
