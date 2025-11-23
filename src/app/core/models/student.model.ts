import { Observable } from 'rxjs';

export type DayName = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export type TimeString = `${number}:${number}`;

export interface ClassSlot {
  readonly course: string;
  readonly day: DayName;
  readonly start: TimeString;
  readonly end: TimeString;
  readonly room: string;
}

export interface Student {
  readonly id: string;
  readonly name: string;
  readonly classes: readonly ClassSlot[];
}

export interface ScheduleRequest {
  readonly id: string;
}

export interface ScheduleResponse {
  readonly student: Student | null;
  readonly fetchedAt?: number;
  readonly error?: string;
}
export interface StudentDataStrategy {
  fetchSchedule(req: ScheduleRequest): Observable<ScheduleResponse>;
}
export interface Class {
  course: string;
  day: string;
  start: string;
  end: string;   
  room: string;
}

