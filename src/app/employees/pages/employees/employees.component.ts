import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees:Array<any> = [];

  constructor(private route: ActivatedRoute, private newEmployeeService: EmployeesService) { 
  }

  ngOnInit(): void {
    this.getEmployeeById();
  }

  getEmployeeById() {
    this.newEmployeeService.getById(this.route.snapshot.paramMap.get('id')).subscribe( (response: any) => {
      this.employees = response;
    })
  }
}
