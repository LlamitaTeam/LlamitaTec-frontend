import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import {ActivatedRoute, Router} from "@angular/router";
import { Employee } from '../../model/employee';
import { Request } from '../../model/request';
import { Client } from '../../model/client';
import {MatDialog} from '@angular/material/dialog';
import { AddrequestDialogComponent } from 'src/app/dialogs/pages/addrequest-dialog/addrequest-dialog.component';
import { Service } from '../../model/service';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {

  employee:Employee= new Employee();
  client: Client = new Client();
  requests:Array<any> = [];
  service: Service = new Service();

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

  addNewRequest() {
    this.newProfileEService.getById(this.getCurrentUserId()).subscribe( (response: any) => {
      this.newProfileEService.getByEmployeeId(this.route.snapshot.paramMap.get('id')).subscribe( (result: any) => {
        const request = {
          title: `Servicio solicitado por ${response.name}`,
          description: `Servicio de ${result.name}`,
          urlToImage: result.service.urlToImage,
          paid: false,
        }
        localStorage.setItem('itemDataa', JSON.stringify(request));
        localStorage.setItem('clientId',JSON.stringify(response.id))
        localStorage.setItem('employeeId',JSON.stringify(result.id))
        localStorage.setItem('serviceId',JSON.stringify(result.service.id))
        const dialogRef = this.dialog.open(AddrequestDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
    });
      })
    })
  }

}
