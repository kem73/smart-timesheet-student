import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Student } from '../../models/student.model';
import { StudentDataStrategy } from './student-data.strategy';

@Injectable({
  providedIn: 'root'
})
export class MockStudentDataStrategy implements StudentDataStrategy {

  private students: Student[] = [
    {
      id: 'S1001',
      name: 'John Doe',
      classes: [
        { course: 'Math', day: 'Mon', start: '08:00', end: '09:30', room: '101' },
        { course: 'Physics', day: 'Mon', start: '10:00', end: '11:30', room: '102' },
        { course: 'Chemistry', day: 'Tue', start: '08:00', end: '09:30', room: '103' }
      ]
    },
    {
      id: 'S1002',
      name: 'Jane Smith',
      classes: [
        { course: 'Biology', day: 'Mon', start: '08:00', end: '09:30', room: '201' },
        { course: 'English', day: 'Tue', start: '10:00', end: '11:30', room: '202' }
      ]
    }
  ];

  getStudentById(id: string, sessionID?: string): Observable<Student | null> {
    if (!sessionID) return of(null).pipe(delay(500));
    const student = this.students.find(s => s.id === id) || null;
    return of(student).pipe(delay(500));
  }

  getAllStudents(sessionID?: string): Observable<Student[]> {
    if (!sessionID) return of([]).pipe(delay(500));
    return of(this.students).pipe(delay(500));
  }
}
