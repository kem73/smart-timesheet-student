import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/models/student.model';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss']
})
export class StudentPage implements OnInit, OnDestroy {
  id = '';
  private router = inject(Router);
  public studentService = inject(StudentService);

  ngOnInit(): void {
    this.studentService.loadAll();
  }
  go(): void {
    this.studentService.error.set('');

    if (!this.id) return;

    const studentExists = this.studentService.students().some(s => s.id === this.id);

    if (!studentExists) {
      this.studentService.error.set('Student not found');
      return;
    }

    this.router.navigate(['/timetable', this.id]);
  }

  ngOnDestroy(): void {
    this.studentService.error.set('');
  }

  /** TrackBy function for *ngFor performance */
  trackById(index: number, student: Student): string {
    return student.id;
  }
}
