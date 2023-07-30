import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

const URL = "http://localhost:8083/user"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  public getUser(): Observable<any> {
    return this._http.get(URL).pipe(catchError(error => {
      return throwError(() => new Error("Not possible to get user"));
    }));
  }
}
