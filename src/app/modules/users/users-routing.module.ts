import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path: 'profile', component: MyProfileComponent},
  {path: ':id', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
