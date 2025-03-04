import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkForm!: FormGroup;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrdersService);
  caryId!: string;

  ngOnInit(): void {
    this.checkForm = new FormGroup({
      details: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
    });
    this.getId();
  }
  onSubmit() {
    console.log(this.checkForm.value);
    this.orderService
      .checkoutPayment(this.caryId, this.checkForm.value)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status == 'success') {
            open(res.session.url, '_self');
          }
          this.checkForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  getId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.caryId = param.get('id')!;
      },
    });
  }
}
