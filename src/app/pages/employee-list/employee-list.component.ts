import { Component, OnInit } from '@angular/core';
import { Employee } from '../../services/model/employee.interface';
import { LocalDataSource } from 'ng2-smart-table';
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
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
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Name',
        type: 'string',
      },
      gross_salary_month: {
        title: 'Salary',
        type: 'number',
      },
      contract_hours_month: {
        title: 'Contract hours',
        type: 'number',
      },
    },
  };

  public employes: Employee[];
  source: LocalDataSource = new LocalDataSource();

  constructor( private employesService: EmployeesService,
    private router: Router) {
    this.employes = [];
  }

  public ngOnInit(): void {
    this.employesService.getEmployes().subscribe(
      employes => {
        this.source = new LocalDataSource(employes); 
        this.employes = employes;
      });

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  onEditConfirm(event): void{
console.log(event)
  }

  onUserRowSelect(event): void {
    this.router.navigate(['./pages/employee/' + event.data.id]);
  }

}
