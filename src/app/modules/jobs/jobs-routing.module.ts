import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AddJobComponent } from './add-job/add-job.component';

const routes: Routes = [
  {path: '', component: JobListComponent},
  { path: 'employer', component: JobListComponent },
  { path: 'addJob', component: AddJobComponent },
  {path: ':id', component: JobDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
