import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AddJobComponent } from './add-job/add-job.component';
import { AuthGuard } from '../../Core/guards/auth.guard';

const routes: Routes = [
  {path: '', component: JobListComponent},
  { path: 'employer', component: JobListComponent, canActivate:[AuthGuard], data: {roles: ['Employer']} },
  { path: 'addJob', component: AddJobComponent,canActivate:[AuthGuard], data: {roles: ['Employer']} },
  {path: ':id', component: JobDetailsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
