import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbTabsetModule, NbRouteTabsetModule, NbListModule, NbButtonModule, NbInputModule, NbDatepickerModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { EmployesComponent } from './employes/employes.component';
import { EmployesTableComponent } from './tables/employes-table/employes-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EmployeeInformationsComponent } from './employee-informations/employee-informations.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from './forms/forms.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { SettingsComponent } from './settings/settings.component';
import {MatSnackBarModule} from '@angular/material';

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
    ReactiveFormsModule
  ],
  declarations: [
    PagesComponent,
    EmployesComponent,
    EmployesTableComponent,
    EmployeeInformationsComponent,
    AddEmployeeComponent,
    ShiftsComponent,
    SettingsComponent,
  ],
})
export class PagesModule {
}
