import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  basePath = 'http://localhost:8080/api/v1/users/auth';
  basePath2 = 'http://localhost:8080/api/v1/clients';
  basePath3 = 'http://localhost:8080/api/v1/employees';
  basePath4 = 'http://localhost:8080/api/v1/users';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb2dhbEBnbWFpbC5jb20iLCJpYXQiOjE2NTYzNzc2NjMsImV4cCI6MTY1Njk4MjQ2M30.d5SuP0DS1gRfEtbep7Ebm4NGmCNlHUwUDMIQ6YiCouk'
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
      .post(`${this.basePath}/sign-up`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  signIn(user: object){
    return this.http
      .post(`${this.basePath}/sign-in`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCurrentToken(){
    let currentTokenString= localStorage.getItem('token')
    if(currentTokenString){
      let currentToken = (JSON.parse(currentTokenString));
      return currentToken;
    }else return null
  }

  createClient(item: object,id: any):Observable<object> {
    return this.http
      .post(`${this.basePath2}/${id}`, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  createEmployee(item: object,userId: any,serviceId: any):Observable<object> {
    return this.http.post(`${this.basePath3}/${userId}/${serviceId}`, item, this.httpOptions)
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
