import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  basePath = 'http://localhost:3000/api/v1/auth';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  currentUser!: User;

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Ann error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError( ()  => new Error('Something happened with request, please try again later'));
  }

  signIn(user: User){
    return this.http
      .post(`${this.basePath}/signin`, user)
      .pipe(retry(2), catchError(this.handleError));
  }
}
