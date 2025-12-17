import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Employee } from '@models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private base = `${environment.apiBaseUrl}/employees`;
  private http = inject(HttpClient);

  list(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.base);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.base}/${id}`);
  }

  create(emp: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(this.base, emp);
  }

  update(id: number, emp: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.base}/${id}`, emp);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
