
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './model/employee.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getEmployes(): Observable<Employee[]> {
    return this.http.get(this.getApiPath('/employees/readall'), { headers: this.getHeader() }).pipe(map(res => this.mapEmployesFromApi(res)));
  }

  public addEmployee(employee : Employee) : Observable<any>{
    let requestBody = JSON.stringify(employee);
    return this.http.post(this.getApiPath('employees'),requestBody,{ headers: this.getHeader() })
      .pipe(map(res => res));
  }

  private getHeader(): HttpHeaders {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set("Content-Type", "application/json");
    header = header.append("thyme_api_token", environment.thymeAPI_KEY);
    return header;
  }


  private mapEmployesFromApi(response: any): Employee[] {
    const employees: Employee[] = [];
    for (let i = 0; i < response.length; i++) {
      const employee: Employee = this.populateEmployeInformations(response[i]);
      employees.push(employee);
    }
    return employees;
  }


  private populateEmployeInformations(responseItem: any): Employee {
    const employee: Employee = <Employee>{};
    employee.id = responseItem.id;
    employee.name = responseItem.name;
    employee.password = responseItem.password;
    employee.gross_salary_month = responseItem.gross_salary_month;
    employee.contract_hours_month = responseItem.contract_hours_month;
    employee.password = responseItem.password;
    return employee;
  }

  getApiPath(path){
    return this.apiUrl+''+path;
  }

}
