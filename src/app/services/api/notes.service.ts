import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { NoteRegister } from 'src/app/models/note-register';
import { NoteUpdate } from 'src/app/models/note-update';

//const URL = "http://localhost:8083/notes"
const URL = "https://note-app-production.up.railway.app/notes";
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _http: HttpClient) { }

  public getNotes(): Observable<any> {
    return this._http.get(URL + "/user").pipe(catchError(error => {
      return throwError(() => new Error("Not possible to get notes"));
    }));
  }

  public saveNote(note: NoteRegister): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(note);
    return this._http.post(URL, body, httpOption).pipe(catchError(error => {
      return throwError(() => new Error("Not possible to create note"));
    }));;
  }

  public updateNote(note: NoteUpdate): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(note);
    return this._http.put(URL, body, httpOption).pipe(catchError(error => {
      return throwError(() => new Error("Not possible to update note"));
    }));;
  }

  public archiveNote(id: number): Observable<any> {
    return this._http.patch(`${URL}/archive/${id}`, {}).pipe(catchError(error => {
      return throwError(() => new Error("Not possible to delete note"));
    }));;
  }

  public dearchiveNote(id: number): Observable<any> {
    return this._http.patch(`${URL}/dearchive/${id}`, {}).pipe(catchError(error => {
      return throwError(() => new Error("Not possible to delete note"));
    }));;
  }

  public deleteNote(id: number): Observable<any> {
    return this._http.delete(`${URL}/${id}`).pipe(catchError(error => {
      return throwError(() => new Error("Not possible to delete note"));
    }));;
  }
}
