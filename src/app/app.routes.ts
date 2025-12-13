import { Routes } from '@angular/router';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
  // { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: EmployeeFormComponent },
  // { path: 'employees/:id/edit', component: EmployeeFormComponent },
];
