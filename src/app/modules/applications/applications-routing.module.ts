import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyApplicationsComponent } from './my-applications/my-applications.component';

const routes: Routes = [
  {path: 'my-applications', component: MyApplicationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
