import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { RegisterService } from '../../services/register.service';
import {Router} from "@angular/router";
import { Employee } from '../../model/employee';
import {Client} from "../../model/client";
import { Usser } from '../../model/usser';

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

  registerForm :FormGroup= this.builder.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    age: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'change'}],
    number: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(9),Validators.minLength(9)], updateOn: 'change'}],
    typeUser: this.floatLabelControl,
    serviceId: this.selected
  });

  constructor(public builder: FormBuilder, public authService: RegisterService, public router: Router) {

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

  addNewuser(){
    console.log(this.registerForm.value.typeUser)
    let userid = this.users.pop().id;
    console.log(userid)
    if(this.registerForm.value.typeUser=="employee"){
      this.employee.id=userid+1;
      this.employee.name=this.registerForm.value.name;
      this.employee.age=this.registerForm.value.age;
      this.employee.service.id=this.registerForm.value.serviceId;
      this.employee.phone=this.registerForm.value.number;
      this.employee.urlToImage="https://i.ibb.co/XkhCy5M/noFoto.jpg";
      this.employee.altphone="";
      this.employee.description="";
      this.authService.createEmployee(this.employee).subscribe( (response: any) => {
        console.log('item added');
      })
    } else if(this.registerForm.value.typeUser=="client"){
      this.client.id=userid+1;
      this.client.name=this.registerForm.value.name;
      this.client.age=this.registerForm.value.age;
      this.client.phone=this.registerForm.value.number;
      this.client.urlToImage="https://i.ibb.co/XkhCy5M/noFoto.jpg";
      this.client.altphone="";
      this.client.description="";
      this.client.address="";
      this.client.user.id=userid+1;
      this.client.user.email=this.registerForm.value.email;
      this.client.user.password=this.registerForm.value.password;
      this.client.user.typeuser=this.registerForm.value.typeuser;
      this.authService.createClient(this.client).subscribe( (response: any) => {
        console.log('item added');
      })
    }
    console.log(this.client)
    this.itemData.id=userid+1;
    this.itemData.email=this.registerForm.value.email;
    this.itemData.password=this.registerForm.value.password;
    this.itemData.typeuser=this.registerForm.value.typeUser;
    this.authService.signUp(this.itemData).subscribe( (response: any) => {
      console.log('item added');
    })
    this.router.navigate(['login']).then();
  }
}
