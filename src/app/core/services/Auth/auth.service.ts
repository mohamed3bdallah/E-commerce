import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private readonly router=inject(Router)
  userData: any = null;

  sendRegisterData(data: object): Observable<any> {
    {
      return this.httpClient.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        data
      );
    }
  }
  sendLoginData(data: object): Observable<any> {
    {
      return this.httpClient.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        data
      );
    }
  }

  saveToken(): void {
    if (localStorage.getItem('token') !== null) {
      this.userData = jwtDecode(localStorage.getItem('token')!);
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.userData = null;
    this.router.navigate(['/login']);
  }

  setEmail(data:object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',data)
  }
  setCode(data:object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',data)
  }
  resetPassword(data:object):Observable<any>{
    return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',data)

  }
}
