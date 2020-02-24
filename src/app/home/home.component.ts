import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Employee } from '../datatypes/employee';
import { EmployeeService } from '../services/employee-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // form
  employeeSearchForm: FormGroup;

  employees: Employee[];
  columnsToDisplay: string[] = ['FullName', 'EmployeeID', 'Email', 'Telephone', 'Band'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService) {
    this.employeeSearchForm = formBuilder.group({
      SearchString: ['']
    });

    this.employeeSearchForm.setValue({
      SearchString: ''
    });

    this.employeeSearchForm.get('SearchString').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((val: string) => {
        this.findEmployees();
      })
  }

  findEmployees(): void {
    const searchString: string = this.employeeSearchForm.get('SearchString').value;
    this.employeeService.employeeFind(searchString)
      .subscribe(employees => {
        this.employees = employees;
      });
  }

  onSubmit() {
    this.findEmployees();
  }

  onSelectEmployee(ID: number) {
    this.router.navigate(['details', ID ]);
  }
}
