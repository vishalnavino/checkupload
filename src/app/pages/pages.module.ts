import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbTabsetModule, NbRouteTabsetModule, NbListModule, NbButtonModule, NbInputModule, NbDatepickerModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { EmployesComponent } from './employes/employes.component';
import { EmployesTableComponent, DeleteEmployeeComponent } from './tables/employes-table/employes-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EmployeeInformationsComponent, ApprovedContentDialogComponent, DeleteDialogComponent } from './employee-informations/employee-informations.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from './forms/forms.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ShiftsComponent, DeleteShiftComponent } from './shifts/shifts.component';
import { SettingsComponent } from './settings/settings.component';
import {MatSnackBarModule, MatSelectModule, MatDialogModule, MatSlideToggleModule} from '@angular/material';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { EditShiftComponent } from './edit-shift/edit-shift.component';
import { ThymeChartsComponent } from './thyme-charts/thyme-charts.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { EditHolidaysComponent } from './holidays/edit-holidays/edit-holidays.component';
import { SickNotesComponent } from './sick-notes/sick-notes.component';
import { EditSickNotesComponent } from './sick-notes/edit-sick-notes/edit-sick-notes.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbListModule,
    NbButtonModule,
    NbDatepickerModule,
    NbInputModule,
    ngFormsModule,
    FormsModule,
    NbSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  declarations: [
    PagesComponent,
    EmployesComponent,
    EmployesTableComponent,
    EmployeeInformationsComponent,
    ApprovedContentDialogComponent,
    DeleteDialogComponent,
    DeleteShiftComponent,
    AddEmployeeComponent,
    ShiftsComponent,
    SettingsComponent,
    DeleteEmployeeComponent,
    EditShiftComponent,
    ThymeChartsComponent,
    HolidaysComponent,
    EditHolidaysComponent,
    SickNotesComponent,
    EditSickNotesComponent,
    

  ],
  entryComponents: [
    DeleteEmployeeComponent,
    ApprovedContentDialogComponent,
    DeleteShiftComponent
  ]
})
export class PagesModule {
}
