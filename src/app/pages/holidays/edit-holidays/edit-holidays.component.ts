import { Component, OnInit } from '@angular/core';
import { TimeSheetService } from '../../../@core/utils/time-sheet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ITimeSheet } from '../../../@core/interfaces/itime-sheet';
import { SnackbarService } from '../../../services/snake-bar.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApprovedContentDialogComponent } from '../../employee-informations/employee-informations.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'ngx-edit-holidays',
  templateUrl: './edit-holidays.component.html',
  styleUrls: ['./edit-holidays.component.scss']
})
export class EditHolidaysComponent implements OnInit {

 
  shiftID : string;
  shift : ITimeSheet;
  holidaysForm: FormGroup;
  changesFields = []

  constructor(private router: Router,
    private route: ActivatedRoute,
    private timeSheetService : TimeSheetService,
    private snakebar: SnackbarService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.initialzeholidaysForm();
    this.route.params.subscribe(params => {
      this.shiftID = params.id
      this.shift.id = params.id
      this.getShift(params.id);
    });
  }


  getShift(id: number) {
    this.timeSheetService.getShift(id).subscribe(shift => {
      this.shift = shift;
      this.setDataForm();
    },
      error => {
        this.snakebar.FailureError('Error')
      });
  }

  changeField(event: any, inputField: string) { 
    console.log("event target value"+event.target.value)
    if (this.shift[inputField] !== event.target.value) {
      this.changesFields.indexOf(inputField) === -1 ? this.changesFields.push(inputField) : console.info("This item already exists");
    } else {
      this.changesFields.splice(this.changesFields.indexOf(inputField), 1);
    }
  }

  editShift() {
    if (this.changesFields.length > 0) {
      this.openApprovedDialog()
    }else{
      this.aprovedContent()
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
    this.formToShiftPopulation();
    this.timeSheetService.updateData(this.shift).subscribe(
      result => {
        this.snakebar.SuccessSnackBar('Update Holidays Inforamation')
      },
      error => {
        this.snakebar.FailureError('Error')
      });
  }

  private formToShiftPopulation() {
    console.log('from date '+this.holidaysForm.controls.from_date.value)
    this.shift.type = this.holidaysForm.controls.type.value;
    this.shift.from_time = this.holidaysForm.controls.from_date.value + 'T' + this.formatTime(this.holidaysForm.controls.from_time.value);
    this.shift.to_time = this.holidaysForm.controls.to_date.value + 'T' + this.formatTime(this.holidaysForm.controls.to_time.value);
    this.shift.note = this.holidaysForm.controls.note.value;
    this.shift.manual_time = this.holidaysForm.controls.manual_time.value;
  }

  private initialzeholidaysForm() {
    this.holidaysForm = this.formBuilder.group({
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

  private formatTime(time : string) : string{
    return time.split(':').length == 3 ?  time : time+':00'
  }

  get t() {
    return this.holidaysForm.controls;
  }


  setDataForm() {
    this.holidaysForm.controls.employee_id.setValue(this.shift.employee_id);
    this.holidaysForm.controls.from_time.setValue(this.shift.from_time.split('T')[1]);
    this.holidaysForm.controls.from_date.setValue(this.shift.from_time.split('T')[0]);
    this.holidaysForm.controls.to_time.setValue(this.shift.to_time.split('T')[1]);
    this.holidaysForm.controls.to_date.setValue(this.shift.to_time.split('T')[0]);
    this.holidaysForm.controls.manual_time.setValue(this.shift.manual_time);
    this.holidaysForm.controls.note.setValue(this.shift.note);
    this.holidaysForm.controls.type.setValue(this.shift.type);
  }

}
