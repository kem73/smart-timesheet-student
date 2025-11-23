import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'students',
    title: 'Students List',
    loadComponent: () =>
      import('./features/student/student.page').then(m => m.StudentPage)
  },
  {
    path: 'timetable/:id',
    title: 'Student Timetable',
    loadComponent: () =>
      import('./features/timetable/timetable.page').then(m => m.TimetablePage)
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'students'
  }
];
