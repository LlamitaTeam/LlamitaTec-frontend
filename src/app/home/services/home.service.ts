import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  basePath = 'http://localhost:8080/api/v1/requests';
  basePath2 = 'http://localhost:8080/api/v1/clients';
  basePath3= 'http://localhost:8080/api/v1/employees';
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
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something happened with request, please try again later');
  }

  getCurrentUserType(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      //console.log(`current user:' ${currentUserString}`)
      let currentUser = (JSON.parse(currentUserString));
      //console.log(currentUser)
      return currentUser.typeuser;
    }else return null
  }

  getAll() {
    return this.http.get(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getById(id: any) {
    if(this.getCurrentUserType()=='employee'){
      return this.http.get(`${this.basePath}/employees/${id}`, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    else{
      return this.http.get(`${this.basePath}/clients/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
  }

  getByEmployeeId(id: any) {
    return this.http.get(`${this.basePath3}/users/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getByClientId(id: any) {
    return this.http.get(`${this.basePath2}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteById(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
