import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/Auth/auth.service';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly authService = inject(AuthService);
  step:number = 1;
  verifyEmail:FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyCode:FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
  });

 resetPass:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  });

  onsubmitEmail():void{
   this.authService.setEmail(this.verifyEmail.value).subscribe({
     next:(res)=>{
       console.log(res);
       if(res.statusMsg === 'success'){
         this.step = 2;
       }

     },
     error:(err)=>{
       console.log(err);
     }

    });
  }
  onsubmitCode():void{
   this.authService.setCode(this.verifyCode.value).subscribe({
     next:(res)=>{
       console.log(res);
       if(res.status === 'success'){
         this.step = 3;
       }

     },
     error:(err)=>{
       console.log(err);
     }

    });
  }
  onsubmitReset():void{
   this.authService.resetPassword(this.resetPass.value).subscribe({
     next:(res)=>{
       console.log(res);


     },
     error:(err)=>{
       console.log(err);
     }

    });
  }
}
