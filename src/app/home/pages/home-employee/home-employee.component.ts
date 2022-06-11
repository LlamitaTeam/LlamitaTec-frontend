import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Client } from '../../model/client';
import {MatDialog} from '@angular/material/dialog';
import { CancelDialogComponent } from 'src/app/dialogs/pages/cancel-dialog/cancel-dialog.component';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})
export class HomeEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['title','description', 'clientId', 'serviceId', 'payed', 'buttons'];
  request:Array<any> = [];
  client:Client=new Client();
  constructor(private newHomeService: HomeService, public router: Router, public dialog: MatDialog) { }

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
  
  openDialog(id:number) {
    localStorage.setItem('RequestId', JSON.stringify(id));
    const dialogRef = this.dialog.open(CancelDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
