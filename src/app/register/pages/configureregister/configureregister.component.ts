import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Client } from '../../model/client';
import { Employee } from '../../model/employee';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-configureregister',
  templateUrl: './configureregister.component.html',
  styleUrls: ['./configureregister.component.css']
})
export class ConfigureregisterComponent implements OnInit {

  selected = new FormControl(1)
  client:Client= new Client();
  employee:Employee= new Employee();

  registerForm :FormGroup= this.builder.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    age: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'change'}],
    number: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(9),Validators.minLength(9)], updateOn: 'change'}],
    serviceId: this.selected
  });

  constructor(public builder: FormBuilder, public authService: RegisterService, public router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
  }

  get name() { return this.registerForm.controls['name'];}
  get age() { return this.registerForm.controls['age'];}
  get number() { return this.registerForm.controls['number'];}

  openSnakbar(){
    this._snackBar.open("Something went wrong while creating a new user", "Close");
  }

  getCurrentUser(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      /*console.log(`current user:' ${currentUserString}`) /.roles[0]/*/
      let currentUser = (JSON.parse(currentUserString));
      return currentUser;
    }else return null
  }

  registerClient(){
    this.client.name=this.registerForm.value.name
    this.client.age=this.registerForm.value.age
    this.client.phone=this.registerForm.value.number
    this.client.altphone="-"
    this.client.urlToImage="https://i.ibb.co/XkhCy5M/noFoto.jpg"
    this.client.address="-"
    this.client.description="-"
    return this.client
  }
  registerEmployee(){
    this.employee.name=this.registerForm.value.name
    this.employee.age=this.registerForm.value.age
    this.employee.phone=this.registerForm.value.number
    this.employee.altphone="-"
    this.employee.urlToImage="https://i.ibb.co/XkhCy5M/noFoto.jpg"
    this.employee.description="-"
    return this.employee
  }

  addNewuser(){
    if (this.getCurrentUser().roles[0]=="ROLE_CLIENT"){
      this.authService.createClient(this.registerClient(),this.getCurrentUser().id).subscribe( (source: any) => {
        console.log('client added');
      })
      this.router.navigate(['home']).then();
    }
    else {
      this.authService.createEmployee(this.registerEmployee(),this.getCurrentUser().id,this.registerForm.value.serviceId).subscribe( (source2: any) => {
        console.log('employee added');
      })
      this.router.navigate(['homeemployee']).then();
    }
  }
}
