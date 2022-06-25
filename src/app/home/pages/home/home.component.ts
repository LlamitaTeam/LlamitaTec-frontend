import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import { CancelDialogComponent } from 'src/app/dialogs/pages/cancel-dialog/cancel-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  show:boolean=false;
  request:Array<any> = [];
  constructor(private newHomeService: HomeService, public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getByClientId();
  }

  getCurrentUserId(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      let currentUser = (JSON.parse(currentUserString));
      return currentUser.id;
    }else return null
  }

  getAllRequests(id:any) {
    this.newHomeService.getById(id).subscribe( (response: any) => {
      this.request = response;
      console.log(response)
    })
  }

  getByClientId(){
    this.newHomeService.getByClientId(this.getCurrentUserId()).subscribe( (response: any) => {
      this.getAllRequests(response.id)
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
