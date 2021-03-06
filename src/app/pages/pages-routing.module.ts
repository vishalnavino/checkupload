import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { EmployesComponent } from './employes/employes.component';
import { EmployeeInformationsComponent } from './employee-informations/employee-informations.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SettingsComponent } from './settings/settings.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { EditShiftComponent } from './edit-shift/edit-shift.component';
import { ThymeChartsComponent } from './thyme-charts/thyme-charts.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { EditHolidaysComponent } from './holidays/edit-holidays/edit-holidays.component';
import { SickNotesComponent } from './sick-notes/sick-notes.component';
import { EditSickNotesComponent } from './sick-notes/edit-sick-notes/edit-sick-notes.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'employee/add',
      component: AddEmployeeComponent,
    },
    {
      path: 'employee/:id',
      component: EmployeeInformationsComponent,
    },
    {
      path: 'employee',
      component: EmployesComponent,
    },
    {
      path: 'shifts',
      component: ShiftsComponent,
    },
    {
      path: 'holidays',
      component: HolidaysComponent,
    },
    {
      path: 'holidays/edit/:id',
      component: EditHolidaysComponent,
    },
    {
      path: 'sick-notes',
      component: SickNotesComponent,
    },
    {
      path: 'sick-notes/edit/:id',
      component: EditSickNotesComponent,
    },
    {
      path: 'stats',
      component: ThymeChartsComponent,
    },
    {
      path: 'shifts/:id',
      component: EditShiftComponent,
    },
    {
      path: 'settings',
      component: SettingsComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'employee',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
