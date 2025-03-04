import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  product:IProduct = {} as IProduct;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {

        let id:any = params.get('id');
        this.productsService.getSpecificProducts(id).subscribe({
          next: (res) => {
           this.product=res.data;
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
