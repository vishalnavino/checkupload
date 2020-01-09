import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EmployeeListComponent } from './employee-list.component';
import { NbMenuModule, NbCardModule, NbTabsetModule, NbRouteTabsetModule, NbListModule, NbButtonModule, NbInputModule, NbDatepickerModule } from '@nebular/theme';
import {
  NbActionsModule,
  NbCheckboxModule,
  NbIconModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { FormsModule } from '../forms/forms.module';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [EmployeeListComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    EmployeeListRoutingModule,
    ThemeModule,
    NbMenuModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbListModule,
    NbButtonModule,
    NbDatepickerModule,
    NbInputModule,
    ngFormsModule,
    ReactiveFormsModule,
    FormsModule,

    
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbSelectModule,
    NbIconModule,
  ],
  exports:[AddComponent]
})
export class EmployeeListModule { }
