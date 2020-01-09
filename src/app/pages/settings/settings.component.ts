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
      timezone: [null , Validators.required],
      breakAfter: [null , Validators.required],
      breakTime: [null , Validators.required]
    })
  }

  // change setting 
  setSetting(){
   
  }



  get b() {
		return this.settingForm.controls;
	}
}
