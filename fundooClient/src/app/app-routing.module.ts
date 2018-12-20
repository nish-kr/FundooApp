import { NgModule } from '@angular/core';
import { RouterModule, Router, ROUTES } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";
import { NotesComponent } from './notes/notes.component';
import { RemindersComponent } from './reminders/reminders.component';
import { ArchiveComponent } from './archive/archive.component';
import { TrashComponent } from './trash/trash.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AddnoteComponent } from './addnote/addnote.component';


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
      children: [
        {
          path: '',
          component: AddnoteComponent
        },
        {
          path: 'addNote',
          component: AddnoteComponent,
          // outlet: "addNote",
          children: [
            {
              path: 'notes',
              component: NotesComponent,
              // outlet: "notes"
            }
          ]
        },

        {
          path: 'reminders',
          component: RemindersComponent,
          // outlet: "reminders"
        },
        {
          path: 'archive',
          component: ArchiveComponent,
          // outlet: "archive"
        },
        {
          path: 'trash',
          component: TrashComponent,
          // outlet: "trash"
        },

      ]
    },
    {
      path: 'resetPassword',
      component: ResetpasswordComponent
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
