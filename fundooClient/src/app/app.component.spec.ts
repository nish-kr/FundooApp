import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { CofirmpasswordDirective } from './cofirmpassword.directive';
import { NotesComponent } from './components/notes/notes.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { CardsComponent } from './components/cards/cards.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { EditLabelComponent } from './components/edit-label/edit-label.component';
import { LabelComponent } from './components/label/label.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickOutsideModule } from 'ng-click-outside';
import { SocialLoginModule } from 'angular-6-social-login';
import { APP_BASE_HREF } from '@angular/common';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        FlexLayoutModule,
        AngularSvgIconModule,
        AmazingTimePickerModule,
        ClickOutsideModule,
        SocialLoginModule,
      ],
      providers:[{
        provide:APP_BASE_HREF,usevalue:"/"
      }],
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
        EditCardComponent,
        EditLabelComponent,
        LabelComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
