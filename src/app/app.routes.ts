import { Routes } from '@angular/router';

import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: EmployeeFormComponent },
  { path: 'employees/:id/edit', component: EmployeeFormComponent },
];
