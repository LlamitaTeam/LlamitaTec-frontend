import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-addrequest-dialog',
  templateUrl: './addrequest-dialog.component.html',
  styleUrls: ['./addrequest-dialog.component.css']
})
export class AddrequestDialogComponent implements OnInit {

  created:boolean=false
  constructor(private newProfileEService: ProfileService, public router: Router) { }

  ngOnInit(): void {
  }

  createData(){
    this.newProfileEService.createRequest(this.getCurrentitemData()).subscribe( (response: any) => {
      console.log('item added');
    })
    this.created=true;
    this.router.navigate(['home']).then();
  }

  getCurrentitemData(){
    let currentItemData= localStorage.getItem('itemData')
    if(currentItemData){
      let itemData = (JSON.parse(currentItemData));
      return itemData;
    }else return null
  }

}
