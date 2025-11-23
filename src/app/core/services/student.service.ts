import { Injectable, inject, signal } from '@angular/core';
import { Student } from '../models/student.model';
import { HttpStudentService } from './http-student.service';
import { finalize, tap, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  readonly student = signal<Student | null>(null);
  readonly students = signal<Student[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  private readonly httpService = inject(HttpStudentService);
  loadAll(): void {
    this.loading.set(true);

    this.httpService.getAll()
      .pipe(
        tap(list => this.students.set(list)),
        catchError(() => {
          this.error.set('Failed to load students');
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }
  loadSchedule(id: string): void {
    this.loading.set(true);

    this.httpService.fetchSchedule({ id })
      .pipe(
        tap(({ student }) => this.student.set(student)),
        catchError(() => {
          this.error.set('Failed to load schedule');
          return of({ student: null });
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }
}
