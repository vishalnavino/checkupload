import { Component, OnInit, forwardRef } from '@angular/core';
import { TimeSheetService } from '../../@core/utils/time-sheet.service';
import { EmployesService } from '../../@core/utils/employes.service';
import { Employee } from '../../@core/interfaces/employe';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-employee-informations',
  templateUrl: './employee-informations.component.html',
  styleUrls: ['./employee-informations.component.scss'],
})
export class EmployeeInformationsComponent implements OnInit {

  tabs: any[] = [
    {
      title: 'Route tab #1',
      route: '/pages/layout/tabs/tab1',
    },
    {
      title: 'Route tab #2',
      route: '/pages/layout/tabs/tab2',
    },
  ];

  employee: Employee = <Employee>{};
  stampInResponse: Object;
  timeStampForm: FormGroup;
  employeeForm: FormGroup;
  stampedIn: boolean = false;
  showTimeSheets: boolean = true;
  showForms: boolean = false;
  formError: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployesService,
    private timeSheetService: TimeSheetService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.initialzeTimeStampForms();
    this.initializeEmployeeForm();
    this.employeeForm.disable();
  }


  private getEmployee(id:string) {
    this.employeeService.getEmployee(id).subscribe(employee => {
      this.employee = employee;
      this.initializeEmployeeForm();
    });
    ;
  }

  public stampIn(password: string): void {
    this.timeSheetService.stampIn(password).subscribe(
      response => {
        if (response.status == 'success') {
          this.stampedIn = true;
        }
      }
    );
  }

  public stampOut(password: string): void {
    this.timeSheetService.stampOut(password).subscribe(
      response => {
        if (response.status == 'success') {
          this.stampedIn = false;
          this.getEmployee(this.employee.id);
        }
      }
    );
  }

  public filterTimeSheets(type) {
    if (this.employee.timeSheets != null) {
      return this.employee.timeSheets.filter(elt => elt.type == type);
    }
  }

  public switchViews() {
    let temp = this.showForms;
    this.showTimeSheets = this.showForms;
    this.showForms = !temp;
  }

  public onSubmit(timeStampData) {
    let password = this.employee.password;
    let fromDate = this.transformDate(timeStampData.fromDate) + "T" + timeStampData.fromTime;
    let toDate = this.transformDate(timeStampData.toDate) + "T" + timeStampData.toTime;
    let note = timeStampData.note;
    this.timeSheetService.saveTimeStamp(password, fromDate, toDate, note).subscribe(
      response => {
        this.switchViews();
        response.status == 'success' ? this.router.navigate(['/pages/employee'])
          : this.formError = "error";
      });
  }

  public onSubmitEmployeeForm(employeeFormData){
    let updatedEmployee: Employee = this.employee;
    if(employeeFormData.name != null){
      updatedEmployee.name = employeeFormData.name;
    }
    if(employeeFormData.password != null){
      updatedEmployee.password = employeeFormData.password;
    }
    this.employeeService.updateEmployee(updatedEmployee).subscribe(
      response => {
      this.employee.editMode = false;
      this.employeeForm.disable();
      console.log('id : '+this.employee.id)
        response.status == 'success' ? this.router.navigate(['/pages/employee/'+this.employee.id])
          : this.formError = "error";
      });
  }

  editEmployee() {
    this.employee.editMode = true;
    this.employeeForm.enable();
  }

  private transformDate(date: string): any {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  private initialzeTimeStampForms() {
    this.timeStampForm = this.formBuilder.group({
      fromDate: '',
      fromTime: '',
      toDate: '',
      toTime: '',
      note: ''
    });
  }


  private initializeEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      name: [this.employee.name],
      password: [this.employee.password]
    });
  }
}