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
import { Reviews } from '../../shared/interfaces/reviews';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, SearchPipe],

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
  categoriesOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 1800,
    autoplayMouseleaveTimeout: 1000,
    autoplayHoverPause: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    center: true,


    items: 6,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly CartService = inject(CartService);
  private readonly toaster = inject(ToastrService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  products: IProduct[] = [];
  categories: ICategory[] = [];
  name: string = '';
  active: string = '';

  reviews: Reviews[] = [
    {
      name: 'John Doe',
      img: 'images/face1.jpeg',
      review:
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
      name: 'Jane Smith',
      img: 'images/face2.jpeg',
      review:
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
      name: 'Alice Johnson',
      img: 'images/face3.jpeg',
      review:
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
  ];

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
        this.ngxSpinnerService.hide('loading');
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
        this.CartService.cartCount.set(res.numOfCartItems);
      },
      error: (err) => {

        console.log(err);
      },
    });
  }
  onclick(name: string) {
    this.name = name;
    this.putActive(name);
  }
  putActive(name: string) {
    this.active = name;
  }
  removeDarkClass(): void {
    document.documentElement.classList.remove('dark'); // Remove the 'dark' class
  }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.removeDarkClass();
  }
}
