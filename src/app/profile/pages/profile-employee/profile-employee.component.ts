import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import {ActivatedRoute, Router} from "@angular/router";
import { Employee } from '../../model/employee';
import { Request } from '../../../profile/model/request';
import { Client } from '../../model/client';
import {MatDialog} from '@angular/material/dialog';
import { AddrequestDialogComponent } from 'src/app/dialogs/pages/addrequest-dialog/addrequest-dialog.component';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {

  employee:Employee= new Employee();
  client: Client = new Client();
  requests:Array<any> = [];
  itemData : Request= new Request();

  constructor(private route: ActivatedRoute, private newProfileEService: ProfileService, public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProfiles();
    this.getAllRequests();
    this.getCurrentUser();
  }

  getProfiles() {
    this.newProfileEService.getByEmployeeId(this.route.snapshot.paramMap.get('id')).subscribe( (response: any) => {
      this.employee = response;
    })
  }

  getAllRequests() {
    this.newProfileEService.getAllRequest().subscribe( (response: any) => {
      this.requests = response;
    })
  }

  getCurrentUserId(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      let currentUser = (JSON.parse(currentUserString));
      return currentUser.id;
    }else return null
  }

  getCurrentUser(){
    this.newProfileEService.getClient(this.getCurrentUserId()).subscribe( (response: any) => {
      this.client= response;
    })
  }

  addNewRequest(employeeId: number,serviceId: number, name: string, urlToImage: string) {
    this.itemData = new Request();
    let request = this.requests.pop().id;
    this.itemData.id = request + 1;
    this.itemData.title = `Servicio solicitado por ${this.client.name}`;
    this.itemData.description = `Servicio de ${name}`;
    this.itemData.serviceId = serviceId;
    this.itemData.employeeId = employeeId;
    this.itemData.clientId = this.getCurrentUserId();
    this.itemData.urlToImage = urlToImage;
    this.itemData.payed = false;

    localStorage.setItem('itemData', JSON.stringify(this.itemData));
    const dialogRef = this.dialog.open(AddrequestDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}
