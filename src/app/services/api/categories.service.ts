import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CategoryRegister } from 'src/app/models/category-register';
import { CategoryUpdate } from 'src/app/models/category-update';


const URL = "http://localhost:8083/categories";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient) { }

  public getCategories(): Observable<any> {
    return this._http.get(URL).pipe(catchError(error => {
      return throwError(() => new Error("Not possible to get notes"));
    }));
  }

  public saveCategory(category: CategoryRegister): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(category);
    return this._http.post(URL, body, httpOption).pipe(catchError(error => {
      return throwError(() => new Error("Not possible to create category"));
    }));;
  }

  public updateCategory(category: CategoryUpdate): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(category);
    return this._http.put(URL, body, httpOption).pipe(catchError(error => {
      return throwError(() => new Error("Not possible to update category"));
    }));;
  }

  public deleteCategory(id: number): Observable<any> {
    return this._http.delete(`${URL}/${id}`).pipe(catchError(error => {
      return throwError(() => new Error("Not possible to delete category"));
    }));;
  }
}
