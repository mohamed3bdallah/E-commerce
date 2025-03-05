import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/Auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);
  msErr: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      Phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{10}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterData(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.isLoading = false;
            this.registerForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);

            this.isSuccess = true;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.registerForm.reset();
          this.msErr = err.error.message;
        },
      });
    }else{
      this.registerForm.markAllAsTouched();
  }
}

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (password === rePassword) {
      return null;
    }
    return { notMatch: true };
  }
}
