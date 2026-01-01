import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { MyApplicationsComponent } from './my-applications/my-applications.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    MyApplicationsComponent
  ]
})
export class ApplicationsModule { }
