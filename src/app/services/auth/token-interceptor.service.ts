import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.logeedIn) {
      const tokenizaReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken}`
        }
      })
      return next.handle(tokenizaReq);
    }

    return next.handle(req);
  }
}
