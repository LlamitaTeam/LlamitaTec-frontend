import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { RegisterService } from '../../services/register.service';
import {Router} from "@angular/router";
import { Employee } from '../../model/employee';
import {Client} from "../../model/client";
import { Usser } from '../../model/usser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users:Array<any> = [];
  itemData:Usser= new Usser();
  floatLabelControl = new FormControl('employee')
  selected = new FormControl(1)
  client:Client= new Client();
  employee:Employee= new Employee();
  id: number=0

  registerForm :FormGroup= this.builder.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    age: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'change'}],
    number: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(9),Validators.minLength(9)], updateOn: 'change'}],
    typeUser: this.floatLabelControl,
    serviceId: this.selected
  });

  constructor(public builder: FormBuilder, public authService: RegisterService, public router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.getAllUsers()
  }

  get name() { return this.registerForm.controls['name'];}
  get email() { return this.registerForm.controls['email'];}
  get password() { return this.registerForm.controls['password'];}
  get age() { return this.registerForm.controls['age'];}
  get number() { return this.registerForm.controls['number'];}

  getAllUsers() {
    this.authService.getAll().subscribe( (response: any) => {
      this.users = response;
      console.log(response)
    })
  }

  openSnakbar(){
    this._snackBar.open("Something went wrong while creating a new user", "Close");
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
    var role;
    if (this.registerForm.value.typeUser=="client"){
      role = "ROLE_CLIENT"
    }
   else{
      role = "ROLE_EMPLOYEE"
   }
    const User={
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      roles: [role]
    }
    const UserLogin={
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    this.authService.signUp(User).subscribe( (response: any) => {
      console.log('user added');
      if (this.registerForm.value.typeUser=="client"){
        this.authService.createClient(this.registerClient(),response.id).subscribe( (source: any) => {
          console.log('client added');
        })
        this.router.navigate(['login']).then();
      }
      else {
        this.authService.createEmployee(this.registerEmployee(),response.id,this.registerForm.value.serviceId).subscribe( (source2: any) => {
          console.log('employee added');
        })
        this.router.navigate(['login']).then();
      }
    })
  }
  signOut(){
    localStorage.removeItem('token');
  }
}


