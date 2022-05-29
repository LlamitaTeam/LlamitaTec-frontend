import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  basePath = 'http://localhost:3000/api/v1/auth';
  basePath2 = 'http://localhost:3000/api/v1/clients';
  basePath3 = 'http://localhost:3000/api/v1/employees';
  basePath4 = 'http://localhost:3000/api/v1/users';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Ann error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError( ()  => new Error('Something happened with request, please try again later'));
  }

  signUp(user: object){
    return this.http
      .post(`${this.basePath}/signup`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  createClient(item: object):Observable<object> {
    return this.http.post(this.basePath2, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  createEmployee(item: object):Observable<object> {
    return this.http.post(this.basePath3, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAll() {
    return this.http.get(this.basePath4, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
