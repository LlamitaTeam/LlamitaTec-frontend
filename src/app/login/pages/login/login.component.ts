import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  message: string =""

  loginForm :FormGroup= this.builder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(public builder: FormBuilder, public authService: LoginService, public router: Router) {

  }
  ngOnInit(): void {
  }

  get email() { return this.loginForm.controls['email'];}
  get password() { return this.loginForm.controls['password'];}

  getCurrentUserType(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      /*console.log(`current user:' ${currentUserString}`)*/
      let currentUser = (JSON.parse(currentUserString));
      return currentUser.roles[0];
    }else return null
  }

  signIn(){
    const User={
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.signIn(User).subscribe((response: any) =>{
      localStorage.setItem('accessToken', JSON.stringify(response.token));
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.loginForm.reset();
      /*console.log(`${localStorage.getItem('accessToken')}`);*/
      if(this.getCurrentUserType()=='ROLE_EMPLOYEE'){
        this.router.navigate(['homeemployee']).then();
      }
      else{
        this.router.navigate(['home']).then();
      }
    });
  }
}
