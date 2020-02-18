import { Component, OnInit } from '@angular/core';
import { ITimeSheet } from '../../@core/interfaces/itime-sheet';
import { LocalDataSource } from 'ng2-smart-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { TimeSheetService } from '../../@core/utils/time-sheet.service';
import { EmployesService } from '../../@core/utils/employes.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snake-bar.service';
import { ExportCsvService } from '../../services/export-csv.service';

@Component({
  selector: 'ngx-sick-notes',
  templateUrl: './sick-notes.component.html',
  styleUrls: ['./sick-notes.component.scss']
})
export class SickNotesComponent implements OnInit {


  settings = {
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
      id: {
        title: 'id',
        type: 'string',
        editable: false,
      },
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
  sickNotesForm: FormGroup;
  fromTime: string = '00:00:00';
  toTime: string = '23:59:00';
  public timeSheets: ITimeSheet[];
  source: LocalDataSource = new LocalDataSource();
  employes: any
  empArray = []
  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private timesheetService: TimeSheetService,
    private employeeServices: EmployesService,
    private router: Router,
    private snakebar: SnackbarService,
    private csvExportService: ExportCsvService) {
    this.timeSheets = [];
  }
  ngOnInit() {
    this.getEmployeeList()
    this.sickNotesForm = this.fb.group({
      fromDate: [null],
      toDate: [null],
      types: [null],
      employee: [null]
    })
    const data = {
      "from_time_start": "1990-01-01T00:00:00",
      "to_time_end": new Date().toISOString().split('.')[0],
      "types": "h",
      "emp_ids": "2",
      "to_time_start": "1990-01-01T00:00:00",
      "from_time_end": new Date().toISOString().split('.')[0],
      "manual_time_end": "23:59:59",
      "manual_time_start": "01:00:00",
    }

    let params = new URLSearchParams();
    for (let key in data) {
      if (data[key] != null) {
        params.set(key, data[key])

      }
    }
    this.loadData(params.toString())
  }


  // call Api For data Load
  loadData(url) {
    this.timesheetService.getShifts(url).subscribe(
      resp => {
        this.timeSheets = resp;
        console.log(this.timeSheets)
        this.source = new LocalDataSource(resp);
      });
  }

  dataSend(event?: any) {

    if (this.sickNotesForm.invalid) {
      return;
    }
    const data = {}
    if (this.fromTime === '00:00:00') {
      data['from_time_start'] = this.transformDate(this.sickNotesForm.value['fromDate']) + "T" + "00:00:00"
    } else {
      if (this.fromTime !== '') {
        data['from_time_start'] = this.transformDate(this.sickNotesForm.value['fromDate']) + "T" + this.fromTime + ":00"
      }
    }

    if (this.toTime === '23:59:00') {
      data['to_time_end'] = this.transformDate(this.sickNotesForm.value['toDate']) + "T" + "00:00:00"
    } else {
      if (this.toTime !== '') {
        data['to_time_end'] = this.transformDate(this.sickNotesForm.value['toDate']) + "T" + this.toTime + ":00"
      }
    }
    data['to_time_start'] = data['from_time_start']
    data['from_time_end'] = data['to_time_end']
    if (this.sickNotesForm.value['employee'] != null) {
      data['emp_ids'] = this.sickNotesForm.value['employee'].join(";")
    }

    let params = new URLSearchParams();
    for (let key in data) {
      if (data[key] != null) {
        params.set(key, data[key])
      }
    }
    this.loadData(params.toString().split('%3B').join(';') + '&manual_time_end=23:59:59&manual_time_start=01:00:00')
  }

  transformDate(date: string): any {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  // export csv File
  downloadCSV() {
    this.csvExportService.downloadFile(this.timeSheets, 'holidays');
  }




  // 
  onUserRowSelect(event): void {
    console.log(event.data)
    this.router.navigate(['./pages/sick-notes/edit/' + event.data.id]);
  }

  getEmployeeList() {
    this.employeeServices.getEmployes().subscribe(
      employes => {
        employes = employes.filter(elt => elt.valid === 1)
        // this.source = new LocalDataSource(employes);
        this.employes = employes;
      });
  }

  selectAll(select) {
    this.employes.forEach(element => {
      this.empArray.push(element.id)
    });
    this.sickNotesForm.controls.employee.setValue(this.empArray)
    this.empArray = []
    this.dataSend()
  }

  deselectAll(select) {
    this.sickNotesForm.controls.employee.setValue([])
    this.dataSend()
  }
}
