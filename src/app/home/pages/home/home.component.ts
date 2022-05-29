import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  show:boolean=false;
  request:Array<any> = [];

  constructor(private newHomeService: HomeService, public router: Router) { }

  ngOnInit(): void {
    this.getAllRequests();
    console.log(this.request)
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
    })
  }

  deleteRequest(id:number) {
    this.newHomeService.deleteById(id).subscribe( (response: any) => {
      this.request = response;
    })
    window.location.reload();
  }

}
