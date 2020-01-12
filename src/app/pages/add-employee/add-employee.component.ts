import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { SnackbarService } from '../../services/snake-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private fb: FormBuilder,private emp: EmployeesService,private snakebar:SnackbarService,private router: Router) { }

  ngOnInit() {
    this.initForm()
  }

  // Submit data employee add form
  addEmployee(){
    if(this.employeeForm.invalid){
      return;
    }
    this.emp.addEmployee(this.employeeForm.value).subscribe(
      result => {
        this.snakebar.SuccessSnackBar('Employee Added Succefully')
        this.router.navigate(['pages/employee'])
      
    },
    error=>{
      this.snakebar.FailureError(error.error.message)
    });
  }

  initForm() {
    this.employeeForm = this.fb.group({
      id:                     [0,    Validators.required],
      name:                   [null, Validators.required],
      password:               [null, Validators.required],
      descr:                  [null, Validators.required],
      gross_salary_month:     [null, Validators.required],
      health_insurance_share: [null, Validators.required],
      surcharge:              [null, Validators.required],
      type:                   [null, Validators.required],
      working_contract:       [null, Validators.required],
      contract_hours_month:   [null, Validators.required],
      limit_hours_month:      [null, Validators.required],
      ref_id:                 [0],
      valid:                  [1],
    })
  }

  get b() {
		return this.employeeForm.controls;
	}
}
