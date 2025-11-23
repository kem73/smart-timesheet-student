import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
  name: 'timeRange', 
  standalone: true 
})
export class TimeRangePipe implements PipeTransform {
  transform(
    start: string | { start: string; end: string } | null | undefined,
    end?: string
  ): string {
    
    if (typeof start === 'object' && start !== null) {
      return this.format(start.start, start.end);
    }
    if (!start || !end) {
      return '';
    }
    return this.format(start, end);
  }
  private format(start: string, end: string): string {
    return `${start} – ${end}`;
  }
}
