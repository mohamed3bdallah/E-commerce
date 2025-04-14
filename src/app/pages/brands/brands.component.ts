import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  brands: any[] = [
    { name: 'chanel', image: 'images/logo1.png' },
    { name: 'louis vuitton', image: 'images/logo2.png' },
    { name: 'nike', image: 'images/logo3.png' },
    { name: 'gobi', image: 'images/logo4.png' },
    { name: 'prada', image: 'images/logo5.png' },
    { name: 'lives', image: 'images/logo6.jpeg' },
    { name: 'champions', image: 'images/logo7.png' },
    { name: 'adidas', image: 'images/logo8.png' },

  ]

}
