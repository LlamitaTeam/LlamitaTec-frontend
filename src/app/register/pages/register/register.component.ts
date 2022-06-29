import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { RegisterService } from '../../services/register.service';
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  floatLabelControl = new FormControl('employee')
  id: number=0

  registerForm :FormGroup= this.builder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    typeUser: this.floatLabelControl,
  });

  constructor(public builder: FormBuilder, public authService: RegisterService, public router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
  }

  get name() { return this.registerForm.controls['name'];}
  get email() { return this.registerForm.controls['email'];}
  get password() { return this.registerForm.controls['password'];}
  get age() { return this.registerForm.controls['age'];}
  get number() { return this.registerForm.controls['number'];}


  openSnakbar(){
    this._snackBar.open("Something went wrong while creating a new user", "Close");
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
      this.authService.signIn(UserLogin).subscribe((result: any)=>{
        localStorage.setItem('accessToken', JSON.stringify(result.token));
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.router.navigate(['configure']).then();
      })
    })
  }
}


