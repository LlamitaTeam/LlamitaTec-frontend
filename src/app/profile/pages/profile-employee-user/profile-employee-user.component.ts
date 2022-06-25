import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../model/employee';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-employee-user',
  templateUrl: './profile-employee-user.component.html',
  styleUrls: ['./profile-employee-user.component.css']
})
export class ProfileEmployeeUserComponent implements OnInit {

  edit=false;
  employee:Employee= new Employee();
  itemData: Employee = new Employee();

  profileForm :FormGroup= this.builder.group({
    number: ['', {validators: [Validators.pattern('^[0-9]*$'), Validators.maxLength(9),Validators.minLength(9)], updateOn: 'change'}],
    altnumber: ['', {validators: [Validators.pattern('^[0-9]*$'), Validators.maxLength(5),Validators.minLength(5)], updateOn: 'change'}],
    description: ['', {validators: [Validators.maxLength(500)], updateOn: 'change'}],
    adress: ['', {validators: [Validators.maxLength(50)], updateOn: 'change'}], 
    urlToImage: ['', {validators: [Validators.maxLength(500)]}]
  });

  constructor(public builder: FormBuilder, private newProfileService: ProfileService, public router: Router) { }

  ngOnInit(): void {
    this.getProfiles();
  }

  get urlToImage() { return this.profileForm.get('urlToImage');}

  get number() { return this.profileForm.get('number');}

  get altnumber() { return this.profileForm.get('altnumber'); }

  get description() { return this.profileForm.get('description'); }
  
  get adress() { return this.profileForm.get('adress'); }

  getCurrentUserId(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      let currentUser = (JSON.parse(currentUserString));
      return currentUser.id;
    }else return null
  }

  getProfiles() {
    this.newProfileService.getById(this.getCurrentUserId()).subscribe( (response: any) => {
      this.employee = response;
    })
  }

  UpdateProfile() {
    this.itemData.id = this.employee.id;
    this.itemData.name = this.employee.name;
    this.itemData.age = this.employee.age;
    this.itemData.service=this.itemData.service;
    this.itemData.user = this.itemData.user;
    if(this.profileForm.value.number==""){
      this.itemData.phone = this.employee.phone;
    }else{
      this.itemData.phone = this.profileForm.value.number;
    }
    if(this.profileForm.value.altnumber==""){
      this.itemData.altphone = this.employee.altphone;
    }else{
      this.itemData.altphone = this.profileForm.value.altnumber;
    }
    if(this.profileForm.value.description==""){
      this.itemData.description = this.employee.description;
    }else{
      this.itemData.description = this.profileForm.value.description;
    }
    if(this.profileForm.value.urlToImage==""){
      this.itemData.urlToImage = this.employee.urlToImage;
    }else{
      this.itemData.urlToImage = this.profileForm.value.urlToImage;
    }
    this.newProfileService.updateProfile(this.itemData.id,this.itemData).subscribe( (response: any) => {
      console.log('item updated');
      console.log(response);
    })
    this.itemData = new Employee();
    this.edit!=this.edit
    window.location.reload();
  }

}

