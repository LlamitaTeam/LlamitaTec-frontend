import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import {ActivatedRoute, Router} from "@angular/router";
import { Employee } from '../../model/employee';
import { Request } from '../../../profile/model/request';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {

  employee:Employee= new Employee();
  requests:Array<any> = [];
  itemData : Request= new Request();

  constructor(private route: ActivatedRoute, private newProfileEService: ProfileService, public router: Router) { }

  ngOnInit(): void {
    this.getProfiles();
    this.getAllRequests();
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

  addNewRequest(employeeId: number,serviceId: number, name: string, urlToImage: string) {
    let request = this.requests.pop().id;
    this.itemData.id = request + 1;
    this.itemData.title = "SERVICIO";
    this.itemData.description = `Servicio de ${name}`;
    this.itemData.serviceId = serviceId;
    this.itemData.employeeId = employeeId;
    this.itemData.clientId = this.getCurrentUserId();
    this.itemData.urlToImage = urlToImage;
    this.itemData.payed = false;

    this.newProfileEService.createRequest(this.itemData).subscribe( (response: any) => {
      console.log('item added');
    })
    this.itemData = new Request();
    this.router.navigate(['home']).then();
  }

}
