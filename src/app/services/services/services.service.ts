import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  basePath = 'https://api-llamitatec.uc.r.appspot.com/api/v1/services';

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.getCurrentUser().token
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

  getCurrentUser(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      let currentUser = (JSON.parse(currentUserString));
      return currentUser;
    }else return null
  }

  create(item: object):Observable<object> {
    return this.http.post(this.basePath, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAll() {
    return this.http.get(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
