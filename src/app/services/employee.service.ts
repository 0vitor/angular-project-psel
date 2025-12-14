import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Employee } from '@models/employee';
import { SearchField } from '@models/search-field';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private base = `${environment.apiBaseUrl}/employees`;
  private http = inject(HttpClient);

  list(searchField: SearchField, query?: string): Observable<Employee[]> {
    if (!query) return this.http.get<Employee[]>(this.base);

    const params = new HttpParams().set(`${searchField}_like`, query);
    return this.http.get<Employee[]>(this.base, { params });
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
