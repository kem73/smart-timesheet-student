import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../core/services/student.service';
import { TimeRangePipe } from '../../shared/pipes/time-range.pipe';
import { timeToMinutes, isToday } from '../../shared/utils/time.utils';
import { ClassSlot } from '../../core/models/student.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule, RouterModule, TimeRangePipe, FormsModule ],
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss']
})
export class TimetablePage implements OnInit {

  private route = inject(ActivatedRoute);
  public studentService = inject(StudentService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.studentService.loadSchedule(id);
  }
  isCurrent(c: ClassSlot): boolean {
    const now = new Date();
    if (!isToday(c.day, now)) return false;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return currentMinutes >= timeToMinutes(c.start) && currentMinutes <= timeToMinutes(c.end);
  }
  isNext(c: ClassSlot): boolean {
    const now = new Date();
    if (!isToday(c.day, now)) return false;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return currentMinutes < timeToMinutes(c.start);
  }
  trackByCourse(index: number, c: ClassSlot): string {
    return c.course;
  }
}
