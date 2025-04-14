import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';



export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService=inject(NgxSpinnerService);
if (!req.url.includes('cart')) {
  ngxSpinnerService.show('loading');
  }


  return next(req).pipe(
    finalize(() => {
      // Hide the spinner only if it was shown

        ngxSpinnerService.hide('loading');

    })
  );
};
