import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { Request } from '../../model/request';
import { Client } from '../../../profile/model/client';
import { Employee } from '../../../profile/model/employee';

interface Card {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  itemData : Request= new Request();
  client : Client= new Client();
  employee : Employee= new Employee();
  floatLabelControl = new FormControl('visa')
  selected = new FormControl(1)
  cards: Card[] = [
    {value: 'visa', viewValue: 'Visa'},
    {value: 'master', viewValue: 'MasterCard'},
  ];
  showNext:boolean=false
  showDialog:boolean=false

  paymentForm :FormGroup= this.builder.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    lastname: ['', [Validators.required, Validators.minLength(6)]],
    dni: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(9),Validators.minLength(9)], updateOn: 'change'}],
    numberCard: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'change'}],
    csv: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(3),Validators.minLength(3)], updateOn: 'change'}],
    date: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(6)]],
    type: this.floatLabelControl,
  });

  constructor(public builder: FormBuilder, private newPaymentService: PaymentService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.getRequest();
  }

  get name() { return this.paymentForm.controls['name'];}
  get lastname() { return this.paymentForm.controls['lastname'];}
  get dni() { return this.paymentForm.controls['dni'];}
  get numberCard() { return this.paymentForm.controls['numberCard'];}
  get csv() { return this.paymentForm.controls['csv'];}
  get date() { return this.paymentForm.controls['date'];}
  get address() { return this.paymentForm.controls['address'];}

  getRequest() {
    this.newPaymentService.getByRequestById(this.route.snapshot.paramMap.get('id')).subscribe( (response: any) => {
      this.itemData = response;
      console.log(this.itemData)
      this.getClientId()
      this.getEmployeeId()
    })
  }

  getClientId(){
    this.newPaymentService.getById(this.itemData.clientId).subscribe( (response: any) => {
      this.client = response;
      console.log(this.client)
    })
  }

  getEmployeeId(){
    this.newPaymentService.getByEmployeeById(this.itemData.employeeId).subscribe( (response: any) => {
      this.employee = response;
      console.log(this.employee)
    })
  }

  updateRequest(){
    this.itemData.payed=true;
    this.newPaymentService.updateRequest(this.itemData.id,this.itemData).subscribe( (response: any) => {
      console.log('item updated');
      console.log(response);
    })
    this.router.navigate(['home']).then();
  }

}
