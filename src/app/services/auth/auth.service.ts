import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginData } from 'src/app/models/login-data.model';
import { RegisterData } from 'src/app/models/register-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //uri = "http://localhost:8083"
  //Produccion:
  uri = "https://note-app-production.up.railway.app";
  token = "";

  constructor(private http: HttpClient, private router: Router) { }

  login(loginData: LoginData) {
    return this.http.post(this.uri + '/auth/login', loginData)
      .pipe(catchError(error => {
        return throwError(() => new Error("Login problem"))
      }));
  }

  register(regiserData: RegisterData) {
    return this.http.post(this.uri + '/auth/register', regiserData)
      .pipe(catchError(error => {
        return throwError(() => new Error("Register problem"))
      }));
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
  }

  get getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  get getUsername(): string | null {
    return localStorage.getItem('username');
  }

  public get logeedIn(): boolean {
    return (localStorage.getItem('auth_token') !== null)
  }
}
