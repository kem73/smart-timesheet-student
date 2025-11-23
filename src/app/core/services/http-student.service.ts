import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { 
  ScheduleRequest, 
  ScheduleResponse, 
  Student, 
  StudentDataStrategy 
} from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class HttpStudentService implements StudentDataStrategy {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly endpoints = {
    students: '/api/students',
    schedule: '/api/schedule'
  } as const;

//    Fetch all students 
  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${this.baseUrl}${this.endpoints.students}`
    );
  }
  fetchSchedule(req: ScheduleRequest): Observable<ScheduleResponse> {
    return this.http
      .post<Student | null>(`${this.baseUrl}${this.endpoints.schedule}`, req)
      .pipe(
        map(student => ({
          student,
          fetchedAt: Date.now()
        }))
      );
  }
}
