import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/models/login-data.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: FormGroup;
  loginData: LoginData;

  badCredentials: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.login = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  async submit() {
    this.badCredentials = false;
    if (this.login.valid) {
      // Llamar login
      this.loginData = new LoginData();
      this.loginData = Object.assign(this.loginData, this.login.value);
      this.authService.login(this.loginData).subscribe(
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
      this.login.markAllAsTouched();
    }
  }
}
