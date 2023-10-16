import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserDetailFormComponent} from './user-detail-form/user-detail-form.component'
import { LogInComponent } from './log-in/log-in.component';
import { ShowUserDetailsComponent } from './show-user-details/show-user-details.component';

const routes: Routes = [
  {path:'',redirectTo:"/login" , pathMatch:'full'},
  {path:"login",component:LogInComponent},
  {path:"form", component:UserDetailFormComponent},
  {path:'details',component:ShowUserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
