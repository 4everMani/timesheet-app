import { Time } from '@angular/common';

export class TimeSheet {
  public craetedBy?: string;
  public status?: string;
  public startDate?: Date;
  public startTime?: Time;
  public endDate?: Date;
  public endTime?: Time;
  public description?: string;
}
