import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services:Array<any> = [];

  constructor(private newService: ServicesService) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices() {
    this.newService.getAll().subscribe( (response: any) => {
      this.services = response;
    })
  }

}
