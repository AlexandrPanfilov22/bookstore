import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';


@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  public override getFirstDayOfWeek(): number {
    return 1;
  }

  public override parse(value: string): Date | null {
    const dateParts: string[] = value.split(' ');
    const dayMonthYear: string[] = dateParts[0].split('.');
    const day: number = +dayMonthYear[0];
    const month: number = +dayMonthYear[1] - 1;
    const year: number = +dayMonthYear[2];

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }

    return super.parse(value);
  }
}
