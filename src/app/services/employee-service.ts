import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../datatypes/Employee';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  employeeFind(searchString: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(AppConfig.settings.employeeSearchAPI.uri + 'Employee/Find/'
      + encodeURIComponent(searchString));
  }

  employeeDetails(ID: number): Observable<Employee> {
    return this.http.get<Employee>(AppConfig.settings.employeeSearchAPI.uri + 'Employee/Details/'
      + ID.toString());
  }
}
