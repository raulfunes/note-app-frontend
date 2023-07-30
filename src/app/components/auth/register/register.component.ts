import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/models/login-data.model';
import { RegisterData } from 'src/app/models/register-data.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register: FormGroup;
  registerData: RegisterData;

  badCredentials: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.register = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  async submit() {
    this.badCredentials = false;
    if (this.register.valid) {
      // Llamar login
      this.registerData = new RegisterData();
      this.registerData = Object.assign(this.registerData, this.register.value)
      this.authService.register(this.registerData).subscribe(
        {
          next(response: any) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('username', response.username);
          },
          error: (error) => {
            console.log(error)
            this.badCredentials = true;
          },
          complete: () => {
            this.router.navigateByUrl("/notes");
          }
        }
      )
    } else {
      this.register.markAllAsTouched();
    }
  }
}
