import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRecordsComponent } from './leave-records.component';

describe('LeaveRecordsComponent', () => {
  let component: LeaveRecordsComponent;
  let fixture: ComponentFixture<LeaveRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
