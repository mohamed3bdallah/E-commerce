import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError,throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (err, next) => {
  const toastrService = inject(ToastrService)
  return next(err).pipe(
    catchError((err) => {
console.log('interceptor errors', err.error.message);
toastrService.error('you have  to login first');
return throwError(() => err);
}))
};
