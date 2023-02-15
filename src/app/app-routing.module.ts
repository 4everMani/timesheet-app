import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { CreateTimesheetComponent } from './timesheet/create-timesheet/create-timesheet.component';
import { TimesheetComponent } from './timesheet/timesheet/timesheet.component';

// const routes: Routes = [];
const routes: Routes = [
  {
    path: '',
    component: TimesheetComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'create',
    component: CreateTimesheetComponent,
  },
  // {
  //     path: "about",
  //     component: AboutComponent
  // },
  // {
  //     path: 'courses/:id',
  //     component: CourseComponent
  // },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
