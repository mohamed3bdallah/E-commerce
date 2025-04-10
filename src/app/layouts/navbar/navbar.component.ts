import { Component, inject, input } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/Auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'], // Corrected property name
})
export class NavbarComponent {
  private readonly flowbiteService = inject(FlowbiteService);
  readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  isLogin = input(true);
cartCount=0
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
   this.cartService.cartCount.subscribe({
    next:(data)=>{
      this.cartCount=data
    }
   })
   this.cartService.getLoged().subscribe({
    next: (res) => {
      this.cartCount = res.numOfCartItems;
    },
    error: (err) => {
      console.log(err);
    },

  });
}
}
