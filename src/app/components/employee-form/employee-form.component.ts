import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    SelectButtonModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;

  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);
  private notificationService = inject(NotificationService);

  loading = false;
  error = '';
  private employeeId?: number;
  stateOptions: SelectItem<boolean>[] = [
    { label: 'ativo', value: true },
    { label: 'inativo', value: false },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      active: [true],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = +id;
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number) {
    this.loading = true;
    this.employeeService.getById(id).subscribe({
      next: (emp) => {
        this.form.patchValue(emp);
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar funcionário';
        this.notificationService.error(this.error);
        this.loading = false;
      },
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    const data = this.form.value;

    const request$ = this.employeeId
      ? this.employeeService.update(this.employeeId, data)
      : this.employeeService.create(data);

    request$.subscribe({
      next: () => {
        this.notificationService.success(
          `Funcionário ${this.employeeId ? 'atualizado' : 'criado'} com sucesso!`
        );
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.error = 'Erro ao salvar funcionário';
        this.notificationService.error(this.error);
        this.loading = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
