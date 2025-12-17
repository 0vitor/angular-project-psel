import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';

import { Employee } from '@models/employee';
import { EmployeeService } from '@services/employee.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
  providers: [ConfirmationService],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    MessageModule,
    SelectModule,
    ConfirmDialogModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
  ],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  q = '';
  loading = false;
  error = '';
  searchField = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private notify: NotificationService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  clear(table: Table) {
    table.clear();
    this.searchField = '';
  }

  confirm(event: Event, e: Employee) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente deletar este usuário?',
      header: 'Excluir funcionário',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Deletar',
        severity: 'danger',
      },

      accept: () => {
        this.onDelete(e);
      },
      reject: () => {
        this.notify.error('Não foi possivel deletar');
      },
    });
  }

  load() {
    this.loading = true;
    this.error = '';

    this.employeeService.list().subscribe({
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

  onEdit(e: Employee) {
    this.router.navigate([`/employees/${e.id}/edit`]);
  }

  onDelete(e: Employee) {
    this.employeeService.delete(e.id).subscribe({
      next: () => {
        this.employees = this.employees.filter((emp) => emp.id !== e.id);
        this.notify.success('Funcionário removido com sucesso');

        if (this.employees.length === 0) {
          this.notify.warning('Nenhum funcionário encontrado');
        }
      },
      error: () => {
        this.notify.error('Erro ao excluir funcionário');
      },
    });
  }
}
