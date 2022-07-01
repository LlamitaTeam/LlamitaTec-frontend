import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  basePath = 'https://api-llamitatec.uc.r.appspot.com/api/v1/clients';
  basePath3= 'https://api-llamitatec.uc.r.appspot.com/api/v1/employees';
  basePath2 = 'https://api-llamitatec.uc.r.appspot.com/api/v1/requests'; 
  basePath4 = 'https://api-llamitatec.uc.r.appspot.com/api/v1/services'; 
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

  getAll() {
    return this.http.get(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getCurrentUser(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      //console.log(`current user:' ${currentUserString}`)
      let currentUser = (JSON.parse(currentUserString));
      //console.log(currentUser)
      return currentUser;
    }else return null
  }

  getById(id: any) {
    if(this.getCurrentUser().roles[0]=='ROLE_EMPLOYEE'){
      return this.http.get(`${this.basePath3}/users/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
    else{
      return this.http.get(`${this.basePath}/${id}`, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  }

  getClient(id: any){
    return this.http.get(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getByEmployeeId(id: any) {
    return this.http.get(`${this.basePath3}/users/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  createRequest(clientId:any,employeeId:any,serviceId:any,item: object):Observable<object> {
    return this.http.post(`${this.basePath2}/${clientId}/${employeeId}/${serviceId}`,item,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAllRequest() {
    return this.http.get(this.basePath2, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateProfile(id: number, item: object){
    if(this.getCurrentUser().roles[0]=='ROLE_EMPLOYEE'){
      return this.http.put(`${this.basePath3}/${id}`,item,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
    else{
      return this.http.put(`${this.basePath}/${id}`,item,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
  }

}
