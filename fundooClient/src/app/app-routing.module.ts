import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    { 
      path: 'dashboard',
      component: DashboardComponent,
      children:[
        
      ]
    },
    { 
      path: 'forgotPassword',
      component: ForgotpasswordComponent
    },
    {
      path: '',
      component: LoginComponent
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
