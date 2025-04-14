import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  private readonly authService = inject(AuthService);
  private readonly ngxService = inject(NgxSpinnerService);
  private readonly router = inject(Router);
  msErr: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);


          if (res.message === 'success') {
            this.isLoading = false;
            this.loginForm.reset();
            setTimeout(() => {
              localStorage.setItem('token', res.token);
              this.authService.saveToken()
              this.router.navigate(['/home']);
            }, 500);

            this.isSuccess = true;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.loginForm.reset();
          this.msErr = err.error.message;
        },
      });
    }

  }
OnInit(): void {
  this.ngxService.hide();

}}
