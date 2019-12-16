import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { EmployesService } from '../../../@core/utils/employes.service';
import { Employee } from '../../../@core/interfaces/employe';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-employes-table',
  templateUrl: './employes-table.component.html',
  styleUrls: ['./employes-table.component.scss']
})
export class EmployesTableComponent implements OnInit {
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

  constructor( private employesService: EmployesService,
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

  onUserRowSelect(event): void {
    this.router.navigate(['./pages/employee/' + event.data.id]);
  }

  onCreateConfirm(event): void {
   const employee: Employee = <Employee>{};
   this.mapEmployeeEventData(employee, event);
   this.employesService.insertEmployee(employee).subscribe(
    result => {
      event.confirm.resolve(event.newData);
    });
  }


  onEditConfirm(event): void {
    console.log('edit');
    const employee: Employee = <Employee>{};
    this.mapEmployeeEventData(employee, event);
    console.log("id: "+event.newData.id)
    employee.id = event.newData.id;
    this.employesService.updateEmployee(employee).subscribe(
     result => {
       event.confirm.resolve(event.newData);
     });
   }



  private mapEmployeeEventData(employee: Employee, event: any) {
    employee.name = event.newData.name;
    employee.gross_salary_month = event.newData.gross_salary_month;
    employee.contract_hours_month = event.newData.contract_hours_month;
  }
}
