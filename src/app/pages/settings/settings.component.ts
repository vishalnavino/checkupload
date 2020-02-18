import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingForm:FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.settingForm =  this.fb.group({
      timezone: [null],
      breakOneAfter:  ['00:00' , Validators.required],
      breakOneLength: ['00:00' , Validators.required],
      breakTwoAfter:  ['00:00' , Validators.required],
      breakTwoLength: ['00:00' , Validators.required],
    })
  }

  // change setting 
  setSetting(){
   if(this.settingForm.invalid){
     return
   }
  //  Than Send a data 
  }



  get b() {
		return this.settingForm.controls;
	}
}
