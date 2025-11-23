import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../../models/student.model';
import { MockStudentDataStrategy } from '../strategies/mock-student-data.strategy';

@Injectable({
  providedIn: 'root'
})
export class StudentFacade {

  private dataStrategy = inject(MockStudentDataStrategy); 

  private studentSubject = new BehaviorSubject<Student | null>(null);
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  get student() { return this.studentSubject.asObservable(); }
  get students() { return this.studentsSubject.asObservable(); }
  get error() { return this.errorSubject.asObservable(); }
  get loading() { return this.loadingSubject.asObservable(); }

  fetchStudentById(id: string) {
    this.loadingSubject.next(true);
    const sessionID = this.generateSessionID(id);
    this.dataStrategy.getStudentById(id, sessionID).subscribe({
      next: (student) => {
        this.studentSubject.next(student);
        this.loadingSubject.next(false);
        if (!student) this.errorSubject.next('Student not found!');
      },
      error: () => {
        this.errorSubject.next('Error fetching student!');
        this.loadingSubject.next(false);
      }
    });
  }

  fetchAllStudents() {
    const sessionID = this.generateSessionID('all');
    this.dataStrategy.getAllStudents(sessionID).subscribe({
      next: (students) => this.studentsSubject.next(students),
      error: () => this.errorSubject.next('Error fetching students!')
    });
  }

  private generateSessionID(id: string): string {
    return btoa(`${Date.now()}-${id}`);
  }
}
