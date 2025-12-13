import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { SearchField } from '../../models/search-field';
import { NotificationService } from '../../services/notification.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    MessageModule,
  ],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  q = '';
  loading = false;
  error = '';

  searchField: SearchField = SearchField.Name;
  searchOptions: SearchField[] = Object.values(SearchField);

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';

    this.employeeService.list(this.searchField, this.q).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.notify.warning('Nenhum funcionário encontrado');
        }

        this.employees = data;
        this.loading = false;
      },
      error: () => {
        this.notify.error('Erro ao carregar funcionários');
        this.loading = false;
      },
    });
  }

  onSearch() {
    this.load();
  }

  onEdit(e: Employee) {
    this.router.navigate([`/employees/${e.id}/edit`]);
  }

  onDelete(e: Employee) {
    if (!confirm(`Remover ${e.name}?`)) return;

    this.employeeService.delete(e.id).subscribe({
      next: () => {
        this.notify.success('Funcionário removido com sucesso');
        this.load();
      },
      error: () => {
        this.notify.error('Erro ao excluir funcionário');
      },
    });
  }
}
