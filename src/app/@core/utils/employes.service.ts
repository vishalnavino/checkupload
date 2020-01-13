import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employe';
import { map } from 'rxjs/operators';
import { ITimeSheet } from '../interfaces/itime-sheet';
import { ThymeConstants} from './thyme-constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  apiUrl: string = environment.apiUrl;
  employeesUrl: string = ThymeConstants.HOST+'/employees/get';
  employeeUrl: string = ThymeConstants.HOST+'/employees/get_shifts?emp_ids=1&types=h;t;s';
  updateEmployeeUrl :string = ThymeConstants.HOST + '/employees/update';
  insertEmployeeUrl :string = ThymeConstants.HOST + '/employees/insert';
  constructor(private http: HttpClient) { }
  public getEmployes(){
    return this.http.get(this.getApiPath('employees/readall'),{headers: this.getThymeApiHeaders()}).pipe(map(res => this.mapEmployesFromApi(res)));
  }

  public getEmployee(id: String): Observable<Employee> {
    return this.http.get(this.getApiPath('employees/'+id)).pipe(map(res => this.mapEmployeeFromApi(res)));
  }
  public updateEmployee(employee : Employee) : Observable<any>{
    // let fullSaveUrl = this.updateEmployeeUrl+"?id="+employee.id;
    // if(employee.name != null){
    //   fullSaveUrl+="&name="+employee.name;
    // }
    // if(employee.password != null){
    //   fullSaveUrl+="&password="+employee.password;
    // }
    return this.http.put(this.getApiPath('employees/'+employee.id), employee ,{headers: this.getThymeApiHeaders()})
      .pipe(map(res => res));
  }

  public insertEmployee(employee : Employee) : Observable<any>{
    let requestBody = JSON.stringify(employee);
    return this.http.post(this.insertEmployeeUrl,requestBody,this.getHttpOptions())
      .pipe(map(res => res));
  }

  public deleteEmployee(id: String) {
    return this.http.delete(this.getApiPath('employees/'+id))
  }

  
  private getThymeApiHeaders(): HttpHeaders {
    let  header: HttpHeaders = new HttpHeaders();
    header = header.set("Content-Type", "application/json");
    header = header.append("thyme_api_token", ThymeConstants.API_KEY);
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

  private mapEmployeeFromApi(response: any): Employee {
    let responseEmployee = response;
    let responseTimeSheets : any[] = response.timesheets;
    let employee = this.populateEmployeInformations(responseEmployee);
    let timeSheets : ITimeSheet[] = [];
    // for (let i = 0; i < responseTimeSheets.length; i++) {
    //   let timeSheet: ITimeSheet = this.populateTimeSheetInformations(responseTimeSheets[i]);
    //   timeSheets.push(timeSheet);
    // }
    employee.timeSheets = timeSheets;
    console.log(employee)
    return employee;
  }

  private populateEmployeInformations(responseItem: any): Employee {
    const employee: Employee = <Employee>{};
    employee.id = responseItem.id;
    employee.name = responseItem.name;
    employee.password = responseItem.password;
    employee.descr = responseItem.descr;

    employee.gross_salary_month = responseItem.gross_salary_month;
    employee.health_insurance_share = responseItem.health_insurance_share;
    employee.surcharge = responseItem.surcharge;
    employee.type = responseItem.type;
    employee.working_contract = responseItem.working_contract;

    employee.contract_hours_month = responseItem.contract_hours_month;
    employee.limit_hours_month = responseItem.limit_hours_month;
    employee.ref_id = responseItem.ref_id;
    employee.valid = responseItem.valid;

    employee.password = responseItem.password;

    return employee;
  }

  
  private populateTimeSheetInformations(responseItem: any): ITimeSheet {
    const timeSheet: ITimeSheet = <ITimeSheet>{};
    timeSheet.from_time = responseItem.from_time;
    timeSheet.to_time = responseItem.to_time;
    timeSheet.hours = responseItem.hours;
    timeSheet.type = responseItem.type;
    timeSheet.deductedHours = responseItem.deductedHours;
    timeSheet.note = responseItem.note;
    return timeSheet;
  }

  private getHttpOptions() : Object {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      })
    };
    return httpOptions;
  }
  getApiPath(path){
    return this.apiUrl+''+path;
  }

}
 