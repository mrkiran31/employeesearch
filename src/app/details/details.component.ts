import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Employee } from '../datatypes/employee';
import { EmployeeService } from '../services/employee-service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  employee: Employee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const ID: number = +params.get("id"); // + converts to number
      this.getEmployeeDetails(ID);
    })
  }

  getEmployeeDetails(ID: number) {
    this.employeeService.employeeDetails(ID)
      .subscribe(employee => {
        this.employee = employee;
      });
  }

  onSelectEmployee(ID: number) {
    this.router.navigate(['details', ID ]);
  }
}
