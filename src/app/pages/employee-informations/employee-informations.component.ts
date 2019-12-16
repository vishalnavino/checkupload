import { Component, OnInit, forwardRef } from '@angular/core';
import { TimeSheetService } from '../../@core/utils/time-sheet.service';
import { EmployesService } from '../../@core/utils/employes.service';
import { Employee } from '../../@core/interfaces/employe';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ThymeConstants } from '../../@core/utils/thyme-constants';

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
  formError: string;
  actifTab: string;


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
    this.initialzeTimeStampForm();
    this.initializeEmployeeForm();
    this.employeeForm.disable();
    this.actifTab = ThymeConstants.TIME_SHEETS_VIEW;
  }

  private getEmployee(id: string) {
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

  public switchViewsTo(viewID: string) {
    this.actifTab = viewID;
  }

  public onSubmit(timeStampData) {
    let password = this.employee.password;
    let type = timeStampData.type;
    let note = timeStampData.note;
    let fromDate;
    let toDate;
    ({ fromDate, toDate } = this.processTimeStampFormByType(type, fromDate, timeStampData, toDate));
    this.submitTimeStampForm(type, password, fromDate, toDate, note);
  }

  private submitTimeStampForm(type: any, password: string, fromDate: any, toDate: any, note: any) {
    this.timeSheetService.saveTimeSheet(type, password, fromDate, toDate, note).subscribe(response => {
      if (response.status == 'success') {
        this.ngOnInit();
      }
      else {
        this.formError = "error";
      }
    });
  }

  private processTimeStampFormByType(type: any, fromDate: any, timeStampData: any, toDate: any) {
    if (type == 'timestamp') {
      fromDate = this.transformDate(timeStampData.fromDate) + "T" + timeStampData.fromTime;
      toDate = this.transformDate(timeStampData.toDate) + "T" + timeStampData.toTime;
      this.actifTab = ThymeConstants.TIME_SHEETS_VIEW;
    }
    else if (type == 'holiday') {
      this.actifTab = ThymeConstants.HOLIDAYS_VIEW;
      fromDate = this.transformDate(timeStampData.fromDate);
      toDate = this.transformDate(timeStampData.toDate);
    }
    else if (type == 'sicknote') {
      this.actifTab = ThymeConstants.SICK_NOTES_VIEW;
      fromDate = this.transformDate(timeStampData.fromDate);
      toDate = this.transformDate(timeStampData.toDate);
    }
    return { fromDate, toDate };
  }

  public onSubmitEmployeeForm(employeeFormData) {
    let updatedEmployee: Employee = this.employee;
    if (employeeFormData.name != null) {
      updatedEmployee.name = employeeFormData.name;
    }
    if (employeeFormData.password != null) {
      updatedEmployee.password = employeeFormData.password;
    }
    this.employeeService.updateEmployee(updatedEmployee).subscribe(
      response => {
        this.employee.editMode = false;
        this.employeeForm.disable();
        response.status == 'success' ? this.router.navigate(['/pages/employee/' + this.employee.id])
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

  private initialzeTimeStampForm() {
    this.timeStampForm = this.formBuilder.group({
      fromDate: '',
      fromTime: '',
      toDate: '',
      toTime: '',
      note: '',
      type: ''
    });
  }


  private initializeEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      name: [this.employee.name],
      password: [this.employee.password]
    });
  }
}