import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Request } from 'src/app/profile/model/request';
@Component({
  selector: 'app-addrequest-dialog',
  templateUrl: './addrequest-dialog.component.html',
  styleUrls: ['./addrequest-dialog.component.css']
})
export class AddrequestDialogComponent implements OnInit {
  created:boolean=false
  request:Request=new Request()
  descriptionForm :FormGroup= this.builder.group({
    description: ['', {validators: [Validators.required, Validators.maxLength(1000)], updateOn: 'change'}],
  });
  constructor(private newProfileEService: ProfileService, public router: Router,public builder: FormBuilder) { }

  ngOnInit(): void {
    this.request=this.getCurrentitemData()
  }

  get description() { return this.descriptionForm.get('description'); }

  createData(){
    this.request.description=this.descriptionForm.value.description
    this.newProfileEService.createRequest(this.request.client.id,this.request.employee.id,this.request.service.id,this.request).subscribe( (response: any) => {
      console.log('item added');
    })
    this.created=true;
    this.router.navigate(['home']).then();
  }

  getCurrentitemData(){
    let currentItemData= localStorage.getItem('itemDataa')
    if(currentItemData){
      let itemData = (JSON.parse(currentItemData));
      return itemData;
    }else return null
  }

  reload(){
    window.location.reload()
  }
}
