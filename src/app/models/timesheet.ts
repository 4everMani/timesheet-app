import { Time } from '@angular/common';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

export interface TimeSheet {
  id?: string;
  craetedBy?: string;
  status?: string;
  startDate?: Timestamp;
  startTime?: Time;
  endDate?: Timestamp;
  endTime?: Time;
  description?: string;
  documentUrl?: string;
}
