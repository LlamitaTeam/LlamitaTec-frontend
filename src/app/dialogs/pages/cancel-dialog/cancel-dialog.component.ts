import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/home/services/home.service';

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.css']
})
export class CancelDialogComponent implements OnInit {

  constructor(private newHomeService: HomeService) { }

  ngOnInit(): void {
  }

  getCurrentRequestId(){
    let currentRequestId= localStorage.getItem('RequestId')
    if(currentRequestId){
      let RequestId = (JSON.parse(currentRequestId));
      return RequestId;
    }else return null
  }

  deleteRequest() {
    this.newHomeService.deleteById(this.getCurrentRequestId()).subscribe( (response: any) => {
      console.log('item deleted')
    })
    window.location.reload();
  }
  
}
