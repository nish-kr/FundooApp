
/** Angular modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularSvgIconModule } from 'angular-svg-icon';

/** In-app Modules & Components */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** Angular Material & Animations modules */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from "./material.module";
import {
  MatButtonModule, MatCheckboxModule, MatSidenavModule,
  MatInputModule, MatToolbarModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule
} from "@angular/material";

import { CofirmpasswordDirective } from './cofirmpassword.directive';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ClickOutsideModule } from 'ng-click-outside';
// import { SimpleImageUploadModule } from 'ngx-simple-image-upload';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { NotesComponent } from './components/notes/notes.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { CardsComponent } from './components/cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    CofirmpasswordDirective,
    NotesComponent,
    RemindersComponent,
    ArchiveComponent,
    TrashComponent,
    AddnoteComponent,
    CardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MaterialModule,
    MatInputModule,
    HttpClientModule,
    MatToolbarModule,
    FormsModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularSvgIconModule,
    AmazingTimePickerModule,
    ClickOutsideModule,
    // SimpleImageUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
