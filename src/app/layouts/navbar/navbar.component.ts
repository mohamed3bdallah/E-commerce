import { Component, computed, inject, input } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/Auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  private readonly ngxService = inject(NgxSpinnerService);
  isLogin = input(true);
cartCount= computed(()=> this.cartService.cartCount());
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

   this.cartService.getLoged().subscribe({

    next: (res) => {
      this.cartService.cartCount.set(res.numOfCartItems);

    },
    error: (err) => {
      console.log(err);


    },

  });
}
}
