import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { ViewApplicationsComponent } from './view-applications/view-applications.component';

const routes: Routes = [
  {path: 'my-applications', component: MyApplicationsComponent},
  {path: ':id/applications', component: ViewApplicationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
