import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { EmployesService } from '../../../@core/utils/employes.service';
import { Employee } from '../../../@core/interfaces/employe';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SnackbarService } from '../../../services/snake-bar.service';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-employes-table',
  templateUrl: './employes-table.component.html',
  styleUrls: ['./employes-table.component.scss']
})
export class EmployesTableComponent implements OnInit, OnDestroy,AfterViewInit {
  data: any;
  options: any;
  themeSubscription: any;

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
        type: 'number',
        show: false,
        editable: false,
        filter: true,
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      type: {
        title: 'Type',
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

  constructor(private employesService: EmployesService, private snakebar: SnackbarService,
    private theme: NbThemeService,
    private dialog: MatDialog,
    private router: Router) {
    this.employes = [];

    // Pie chart classes
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
        datasets: [{
          data: [300, 500, 100],
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  public ngOnInit(): void {
    this.employesService.getEmployes().subscribe(
      employes => {
        employes = employes.filter(elt => elt.valid === 1)
        this.source = new LocalDataSource(employes);
        this.employes = employes;
      });
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Score',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      };
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  // delete PopUp
  openDeleteDialog(event) {
    this.dialog.open(DeleteEmployeeComponent, {
      disableClose: false,
      width: '500px',
    }).afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.deleteEmployeeClick(event.data.id);
        event.confirm.resolve()
      } else {
        event.confirm.reject()
      }
    });
  }

  // delete Employee
  deleteEmployeeClick(id: string) {
    this.employesService.deleteEmployee(id).subscribe(
      result => {
        this.snakebar.SuccessSnackBar('Succefully Delete Employee')
      }, error => {
        this.snakebar.SuccessSnackBar('Internal Server error' + error.error.message)
      })
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
    console.log("id: " + event.newData.id)
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

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}



@Component({
  selector: 'vex-components-delete-content',
  templateUrl: './popup/delete-employee.component.html'
})
export class DeleteEmployeeComponent {
  // icClose = icClose;
  changeField: string;
  constructor(private dialogRef: MatDialogRef<DeleteEmployeeComponent>) {

  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}