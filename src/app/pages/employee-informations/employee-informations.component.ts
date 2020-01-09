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
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: false,

    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'id',
        type: 'string',
        show: false,
        editable:false,
        filter: true,
      },
      from: {
        title: 'Name',
        type: 'string',
      },
      to: {
        title: 'To',
        type: 'string',
      },
      note: {
        title: 'Note',
        type: 'string',
      },

    },
  };
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
exData=[
  {
      "id": 18,
      "from_time": "2020-01-08T02:52:05",
      "to_time": "2020-01-11T21:40:17",
      "type": "t",
      "manual_time": "00:00:00",
      "note": "asdfasd",
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-07T06:52:05"
  },
  {
      "id": 14,
      "from_time": "2020-01-07T06:45:52",
      "to_time": "2020-01-07T06:46:07",
      "type": "t",
      "manual_time": "00:00:00",
      "note": 'india',
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-07T06:45:52"
  },
  {
      "id": 13,
      "from_time": "2020-01-07T06:42:22",
      "to_time": "2020-01-07T06:42:30",
      "type": "t",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-07T06:42:22"
  },
  {
      "id": 12,
      "from_time": "2020-01-07T06:41:43",
      "to_time": "2020-01-07T06:41:55",
      "type": "h",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-07T06:41:43"
  },
  {
      "id": 11,
      "from_time": "2020-01-07T06:39:13",
      "to_time": "2020-01-07T06:39:22",
      "type": "t",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-07T06:39:13"
  },
  {
      "id": 10,
      "from_time": "2020-01-07T06:33:09",
      "to_time": "2020-01-07T06:33:21",
      "type": "s",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-07T06:33:09"
  },
  {
      "id": 9,
      "from_time": "2020-01-07T06:25:35",
      "to_time": "2020-01-07T06:32:29",
      "type": "t",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-07T06:25:35"
  },
  {
      "id": 8,
      "from_time": "2020-01-07T06:20:17",
      "to_time": "2020-01-07T06:24:45",
      "type": "s",
      "manual_time": "00:00:00",
      "note": 'chicago',
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-07T06:20:20"
  },
  {
      "id": 6,
      "from_time": "2020-01-04T12:08:37",
      "to_time": "2020-01-04T12:08:55",
      "type": "t",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-04T12:08:37"
  },
  {
      "id": 5,
      "from_time": "2020-01-04T11:28:02",
      "to_time": "2020-01-04T11:28:20",
      "type": "t",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-04T11:28:02"
  },
  {
      "id": 4,
      "from_time": "2020-01-04T10:21:59",
      "to_time": "2020-01-04T10:22:21",
      "type": "t",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-04T10:21:59"
  },
  {
      "id": 3,
      "from_time": "2020-01-04T10:19:30",
      "to_time": "2020-01-04T10:20:04",
      "type": "t",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-04T10:19:30"
  },
  {
      "id": 2,
      "from_time": "2020-01-04T10:11:41",
      "to_time": "2020-01-04T10:15:13",
      "type": "t",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-04T10:11:41"
  },
  {
      "id": 1,
      "from_time": "2020-01-03T14:15:53",
      "to_time": "2020-01-04T10:11:23",
      "type": "t",
      "manual_time": "00:00:00",
      "note": null,
      "ref_id": 0,
      "valid": 1,
      "employee_id": null,
      "ts": "2020-01-03T14:15:54"
  }
]

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
    this.initEmployeeForm()
    this.route.params.subscribe(params => {
      this.getEmployee(params.id);
    });

    
    this.initialzeTimeStampForm();
    // this.initializeEmployeeForm();
    // this.employeeForm.disable();
    this.actifTab = ThymeConstants.TIME_SHEETS_VIEW;
  }

  private getEmployee(id: string) {
    this.employeeService.getEmployee(id).subscribe(employee => {
      this.employee = employee;
      this.setDataForm();
    });
    ;
  }

    // Submit data employee add form
    addEmployee(){
      if(this.employeeForm.invalid){
        return;
      }
      this.employeeService.updateEmployee(this.employeeForm.value).subscribe(
        result => {
          console.log(result)
        });
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
    // if (this.employee.timeSheets != null) {
    //   return this.employee.timeSheets.filter(elt => elt.type == type);
    // }
      return this.exData.filter(elt => elt.type == type);
    
  }

  public switchViewsTo(viewID: string) {
    this.actifTab = viewID;
  }

  public onSubmit() {
    debugger
    let password = this.employee.password;
    let type = this.timeStampForm.value.type;
    let note = this.timeStampForm.value.note;
    let from_date;
    let to_date;
    ({ from_date, to_date } = this.processTimeStampFormByType(type, from_date, this.timeStampForm.value, to_date));
    this.submitTimeStampForm(type, password, from_date, to_date, note);
  }

  private submitTimeStampForm(type: any, password: string, from_date: any, to_date: any, note: any) {
    this.timeStampForm.controls.type.setValue(type)

    this.timeSheetService.saveTimeSheet(this.timeStampForm.value).subscribe(response => {
      if (response.status == 'success') {
        this.ngOnInit();
      }
      else {
        this.formError = "error";
      }
    });
  }

  private processTimeStampFormByType(type: any, from_date: any, timeStampData: any, to_date: any) {
    if (type == 'timestamp') {
      this.timeStampForm.controls.from_time.setValue(this.transformDate(timeStampData.from_date) + "T" + timeStampData.from_time + ":00")
      this.timeStampForm.controls.to_time.setValue(this.transformDate(timeStampData.to_date) + "T" + timeStampData.to_time + ":00")
      this.actifTab = ThymeConstants.TIME_SHEETS_VIEW;
    }
    else if (type == 'holiday') {
      this.actifTab = ThymeConstants.HOLIDAYS_VIEW;
      this.timeStampForm.controls.from_date.setValue(this.transformDate(timeStampData.from_date))
      this.timeStampForm.controls.to_date.setValue(this.transformDate(timeStampData.to_date))
    }
    else if (type == 'sicknote') {
      this.actifTab = ThymeConstants.SICK_NOTES_VIEW;
      this.timeStampForm.controls.from_date.setValue(this.transformDate(timeStampData.from_date))
      this.timeStampForm.controls.to_date.setValue(this.transformDate(timeStampData.to_date))
    }
    return { from_date, to_date };
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
      from_date: [null, Validators.required],
      from_time: [null, Validators.required],
      to_date:   [null, Validators.required],
      to_time:   [null, Validators.required],
      note:     [null, Validators.required],
      type:     [null, Validators.required],
      employee_id: [null, Validators.required]
      // {
      //   "employee_id": 0,
      //   "from_time": "1990-05-25T05:05:05",
      //   "id": 0,
      //   "manual_time": "05:05:05",
      //   "note": "string",
      //   "ref_id": 0,
      //   "to_time": "1990-05-20T05:05:05",
      //   "ts": "1990-05-21T05:05:05",
      //   "type": "string",
      //   "valid": 0
      // }
    });
  }





  initEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
    id: [0, Validators.required],
    name: [null, Validators.required],
    password: [null, Validators.required],
    descr: [null, Validators.required],
    gross_salary_month: [null, Validators.required],
    health_insurance_share: [null, Validators.required],
    surcharge: [null, Validators.required],
    type: [null, Validators.required],
    working_contract: [null, Validators.required],
    contract_hours_month: [null, Validators.required],
    limit_hours_month: [null, Validators.required],
    ref_id: [null, Validators.required],
    valid: [null, Validators.required],
    })
    }
    
    get b() {
    return this.employeeForm.controls;
    }

    setDataForm(){
      this.employeeForm.controls.id.setValue(this.employee.id)
      this.timeStampForm.controls.employee_id.setValue(this.employee.id)

      this.employeeForm.controls.name.setValue(this.employee.name)
      this.employeeForm.controls.password.setValue(this.employee.password)
      this.employeeForm.controls.descr.setValue(this.employee.descr)
      this.employeeForm.controls.gross_salary_month.setValue(this.employee.gross_salary_month)
      this.employeeForm.controls.health_insurance_share.setValue(this.employee.health_insurance_share)
      this.employeeForm.controls.surcharge.setValue(this.employee.surcharge)
      this.employeeForm.controls.type.setValue(this.employee.type)
      this.employeeForm.controls.working_contract.setValue(this.employee.working_contract)
      this.employeeForm.controls.contract_hours_month.setValue(this.employee.contract_hours_month)
      this.employeeForm.controls.limit_hours_month.setValue(this.employee.limit_hours_month)
      this.employeeForm.controls.ref_id.setValue(this.employee.ref_id)
      this.employeeForm.controls.valid.setValue(this.employee.valid)

    }
}