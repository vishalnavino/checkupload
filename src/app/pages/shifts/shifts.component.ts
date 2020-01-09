import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { ITimeSheet } from '../../@core/interfaces/itime-sheet';
import { TimeSheetService } from '../../@core/utils/time-sheet.service';

@Component({
  selector: 'ngx-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {
  shiftForm: FormGroup;
  fromTime: string;
  toTime: string;
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
    },
  };

  public timeSheets: ITimeSheet[];
  source: LocalDataSource = new LocalDataSource();

 
  constructor(private fb: FormBuilder, private datePipe: DatePipe,private timesheetService: TimeSheetService,
    private router: Router) {
      this.timeSheets = [];
  }

  ngOnInit() {
    this.shiftForm = this.fb.group({
      fromDate: [null],
      toDate: [null],
      type: [null],
      employee: [null]
    })

    this.timesheetService.getShifts().subscribe(
      resp => {
        this.source = new LocalDataSource(resp); 
      });
  }

  dataSend(event) {
    if (this.shiftForm.invalid) {
      return;
    }
    const data = {}
    if (this.fromTime === undefined) {
      data['from_time_start'] = this.transformDate(this.shiftForm.value['fromDate']) + "T" + "00:00:00"
    } else {
      if(this.fromTime !== ''){
        data['from_time_start'] = this.transformDate(this.shiftForm.value['fromDate']) + "T" + this.fromTime + ":00"
      }
    }

     if (this.toTime === undefined) {
      data['to_time_end'] = this.transformDate(this.shiftForm.value['fromDate']) + "T" + "00:00:00"
    } else {
      if(this.toTime !== ''){
        data['to_time_end'] = this.transformDate(this.shiftForm.value['fromDate']) + "T" + this.toTime + ":00"
      }
    }

    if(this.shiftForm.value['type'] != null){
      data['type'] = this.shiftForm.value['type'].join(",")

    }

    if(this.shiftForm.value['employee'] != null){
      data['emp_ids'] = this.shiftForm.value['employee'].join(";")

    }
    data['to_time_start'] = data['from_time_start']
    data['start_time_start'] = data['to_time_end']
    let params = new URLSearchParams();
    for(let key in data){
      if(data[key]!= null){
        params.set(key, data[key])

      }
    }
    
    console.log(params.toString())
    console.log(data)
  }


  transformDate(date: string): any {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
