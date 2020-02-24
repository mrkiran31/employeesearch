export class Employee {
  ID: number;
  FullName: string;
  EmployeeID: string;
  Email: string;
  Telephone: string;
  Band: string;
  Boss: Employee;
  Reports: Employee[];
}
