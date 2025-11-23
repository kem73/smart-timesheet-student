import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';

export interface StudentDataStrategy {
  getStudentById(id: string, sessionID?: string): Observable<Student | null>;
  getAllStudents(sessionID?: string): Observable<Student[]>;
}
