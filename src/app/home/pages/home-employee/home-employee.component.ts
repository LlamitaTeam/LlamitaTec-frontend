import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Client } from '../../model/client';
@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})
export class HomeEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['title','description', 'clientId', 'serviceId', 'payed', 'buttons'];
  request:Array<any> = [];
  client:Client=new Client();
  constructor(private newHomeService: HomeService, public router: Router) { }

  ngOnInit(): void {
    this.getAllRequests();
  }
  
  getCurrentUserId(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      let currentUser = (JSON.parse(currentUserString));
      return currentUser.id;
    }else return null
  }

  getAllRequests() {
    this.newHomeService.getById(this.getCurrentUserId()).subscribe( (response: any) => {
      this.request = response;
      console.log(response)
    })
  }
  getClient(id:number){
    this.newHomeService.getById(id).subscribe( (response: any) => {
      this.client = response;
      return response.name
    })
  }
  
  deleteRequest(id:number) {
    this.newHomeService.deleteById(id).subscribe( (response: any) => {
      this.request = response;
    })
    window.location.reload();
  }
}
