import { Component, OnInit, forwardRef } from '@angular/core';
import { TimeSheetService } from '../../@core/utils/time-sheet.service';
import { EmployesService } from '../../@core/utils/employes.service';
import { Employee } from '../../@core/interfaces/employe';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ThymeConstants } from '../../@core/utils/thyme-constants';
import { LocalDataSource } from 'ng2-smart-table';
import { SnackbarService } from '../../services/snake-bar.service';
import { ITimeSheet } from '../../@core/interfaces/itime-sheet';
import { MatDialog, MatDialogRef } from '@angular/material';

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
        editable: false,
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
  changesFields = []
  timesheetSetting = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,

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
      // id: {
      //   title: 'id',
      //   type: 'string',
      //   show: false,
      //   editable: false,
      //   filter: true,
      // },
      from_time: {
        title: 'From',
        type: 'string',
      },
      to_time: {
        title: 'To',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      note: {
        title: 'Note',
        type: 'string',
      },
      manual_time: {
        title: 'Manual Time',
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
  exData = [

  ]
  empId: string;
  employee: Employee = <Employee>{};
  stampInResponse: Object;
  timeStampForm: FormGroup;
  employeeForm: FormGroup;
  stampedIn: boolean = false;
  formError: string;
  actifTab: string;
  sourceTimesheets: LocalDataSource = new LocalDataSource();
  sourceSlickNotes: LocalDataSource = new LocalDataSource();
  sourceHoliDays: LocalDataSource = new LocalDataSource();


  constructor(private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployesService,
    private timeSheetService: TimeSheetService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private snakebar: SnackbarService,
    private dialog: MatDialog, ) {

  }

  ngOnInit() {
    this.initEmployeeForm()
    this.route.params.subscribe(params => {
      this.empId = params.id
      this.getEmployee(params.id);

    });
    const data = {
      "from_time_start": "1990-01-01T00:00:00",
      "to_time_end": new Date(2524590000 * 1000).toISOString().split('.')[0],
      "types": "t;h;s",
      "emp_ids": this.empId,
      "to_time_start": "1990-01-01T00:00:00",
      "from_time_end": new Date(2524590000 * 1000).toISOString().split('.')[0],
      "manual_time_end": "23:59:59",
      "manual_time_start": "01:00:00",
    }
    let params = new URLSearchParams();
    for (let key in data) {
      if (data[key] != null) {
        params.set(key, data[key])

      }
    }
    this.getTimeSheetData(params.toString())
    this.initialzeTimeStampForm();
    // this.initializeEmployeeForm();
    // this.employeeForm.disable();
    this.actifTab = ThymeConstants.TIME_SHEETS_VIEW;
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(employee => {
      this.employee = employee;
      if (this.employee.valid === 0) {
        this.router.navigate(['pages/employee'])
      }
      this.setDataForm();
    },
      error => {
        this.snakebar.FailureError('Error')
      });

  }

  // Submit data employee add form
  addEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }
    if (this.changesFields.length > 0) {
      this.openApprovedDialog()
    }else{
      this.aprovedContent()
    }

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

  filterTimeSheets(type) {
    // if (this.employee.timeSheets != null) {
    //   return this.employee.timeSheets.filter(elt => elt.type == type);
    // }
    // this.source = new LocalDataSource(this.exData.filter(elt => elt.type == type)); 
    //   return    this.source  
  }

  public switchViewsTo(viewID: string) {
    this.actifTab = viewID;
    if (this.actifTab == 'holidayForm') {
      this.timeStampForm.controls.type.setValue('h')
    }
    else if (this.actifTab == 'timeStampForm') {
      this.timeStampForm.controls.type.setValue('t')
    }
    else if (this.actifTab == 'sickNoteForm') {
      this.timeStampForm.controls.type.setValue('s')
    }
  }

  public onSubmit() {
    // if(this.timeStampForm.invalid){
    //   return ;
    // }
    if (this.timeStampForm.value.manual_time !== '00:00:00') {
      this.timeStampForm.controls.manual_time.setValue(this.timeStampForm.value.manual_time + ':00')
    }
    // this.switchViewsTo('timeSheetsView')
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
      this.snakebar.SuccessSnackBar('Timesheet added succefully')
      this.actifTab = 'timeSheetsView'
      this.getTimeSheetData()
    }

    );
  }

  private processTimeStampFormByType(type: any, from_date: any, timeStampData: any, to_date: any) {
    if (type == 'timestamp') {
      this.timeStampForm.controls.from_time.setValue(this.transformDate(timeStampData.from_date) + "T" + timeStampData.from_time + ":00")
      this.timeStampForm.controls.to_time.setValue(this.transformDate(timeStampData.to_date) + "T" + timeStampData.to_time + ":00")
      this.actifTab = ThymeConstants.TIME_SHEETS_VIEW;
    }
    else if (type == 'holiday') {
      this.actifTab = ThymeConstants.HOLIDAYS_VIEW;
      this.timeStampForm.controls.from_time.setValue(this.transformDate(timeStampData.from_date) + "T" + timeStampData.from_time + ":00")
      this.timeStampForm.controls.to_time.setValue(this.transformDate(timeStampData.to_date) + "T" + timeStampData.to_time + ":00")
    }
    else if (type == 'sicknote') {
      this.actifTab = ThymeConstants.SICK_NOTES_VIEW;
      this.timeStampForm.controls.from_time.setValue(this.transformDate(timeStampData.from_date) + "T" + timeStampData.from_time + ":00")
      this.timeStampForm.controls.to_time.setValue(this.transformDate(timeStampData.to_date) + "T" + timeStampData.to_time + ":00")
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
      },
      error => {
        this.snakebar.FailureError(error.error.message)
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
      to_date: [null, Validators.required],
      to_time: [null, Validators.required],
      note: [null, Validators.required],
      type: [null, Validators.required],
      employee_id: [null, Validators.required],
      manual_time: ['00:00:00'],
    });
  }

  get t() {
    return this.timeStampForm.controls;
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

  setDataForm() {
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


  getTimeSheetData(data?: any) {
    this.timeSheetService.getShifts(data).subscribe(result => {
      this.sourceTimesheets = new LocalDataSource(result.filter(elt => elt.type == 't' && elt.valid == 1));
      this.sourceSlickNotes = new LocalDataSource(result.filter(elt => elt.type == 's' && elt.valid == 1));
      this.sourceHoliDays = new LocalDataSource(result.filter(elt => elt.type == 'h' && elt.valid == 1));
    })
  }




  // timesheet row select crud
  onCreateConfirm(event): void {
    console.log('create');
    let timesheet: ITimeSheet = <ITimeSheet>{};
    timesheet = event.newData
    this.timeSheetService.insertData(timesheet).subscribe(
      result => {
        this.snakebar.SuccessSnackBar('Succefully Added TimeSheet !!')
        event.confirm.resolve(event.newData);
      },
      error => {
        this.snakebar.FailureError(error.error.message)
      });
  }

  onEditConfirm(event) {
    console.log('edit');
    let timesheet: ITimeSheet = <ITimeSheet>{};
    timesheet = event.newData
    this.timeSheetService.updateData(timesheet).subscribe(
      result => {
        this.snakebar.SuccessSnackBar('Succefully Edit TimeSheet !!')
        event.confirm.resolve(event.newData);
      },
      error => {
        this.snakebar.FailureError(error.error.message)
      });
  }



  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.timeSheetService.deleteData(event.newData.id).subscribe(
        result => {
          this.snakebar.SuccessSnackBar('Succefully Delete TimeSheet !!')
          event.confirm.resolve();
        },
        error => {
          this.snakebar.FailureError(error.error.message)
        });
    } else {
      event.confirm.reject();
    }
  }

  // when change field pop-up open 
  changeField(event: any, inputField: string) { // without type info
    if (this.employee[inputField] !== event.target.value) {
      this.changesFields.indexOf(inputField) === -1 ? this.changesFields.push(inputField) : console.info("This item already exists");
    } else {
      this.changesFields.splice(this.changesFields.indexOf(inputField), 1);
    }
  }


  openApprovedDialog() {
    sessionStorage.setItem('changesArray', JSON.stringify(this.changesFields))
    this.dialog.open(ApprovedContentDialogComponent, {
      disableClose: false,
      width: '500px',
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.aprovedContent();
      }
    });
  }
  aprovedContent() {
    this.employeeService.updateEmployee(this.employeeForm.value).subscribe(
      result => {
        this.snakebar.SuccessSnackBar('Update Employee Inforamation')
      },
      error => {
        this.snakebar.FailureError('Error')
      });
  }

  // delete PopUp
  openDeleteDialog(id: string) {
    this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      width: '500px',
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.deleteEmployeeClick(id);
      }
    });
  }

    // delete Employee
    deleteEmployeeClick(id: string) {
      this.employeeService.deleteEmployee(id).subscribe(
        result => {
          this.snakebar.SuccessSnackBar('Succefully Delete Employee')
        })
    }
}


// Approved Content

@Component({
  selector: 'vex-components-approved-content',
  templateUrl: './popup/field-popup.component.html'
})
export class ApprovedContentDialogComponent {
  // icClose = icClose;
  changeField: string;
  constructor(private dialogRef: MatDialogRef<ApprovedContentDialogComponent>) {
    this.changeField = JSON.parse(sessionStorage.getItem('changesArray')).join(',')

  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}



// Approved Content

@Component({
  selector: 'vex-components-delete-content',
  templateUrl: './popup/delete-employee.component.html'
})
export class DeleteDialogComponent {
  // icClose = icClose;
  changeField: string;
  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>) {

  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}