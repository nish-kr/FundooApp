import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from 'src/app/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AddnoteComponent } from '../addnote/addnote.component';
import { RemindersComponent } from '../reminders/reminders.component';
import { ArchiveComponent } from '../archive/archive.component';
import { TrashComponent } from '../trash/trash.component';
import { LabelComponent } from '../label/label.component';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { CardsComponent } from '../cards/cards.component';
import { NotesComponent } from '../notes/notes.component';
import { CofirmpasswordDirective } from 'src/app/cofirmpassword.directive';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService, AuthServiceConfig } from 'angular-6-social-login';
import { getAuthServiceConfigs } from 'src/app/app.module';
import { LocaleService, TranslationModule, L10nConfig, LogLevel, StorageStrategy, ProviderType } from 'angular-l10n';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from '../dashboard/dashboard.component';

const l10nConfig: L10nConfig = {
  logger: {
    level: LogLevel.Warn
  },
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' },
      { code: 'hi', dir: 'ltr' }
    ],
    language: 'en',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      { type: ProviderType.Static, prefix: './assets/locale-' }
    ],
    caching: true,
    composedKeySeparator: '.',
    missingValue: 'No key'
  }
};

describe('AddnoteComponent', () => {
  let component: ForgotpasswordComponent;
  let fixture: ComponentFixture<ForgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        AngularSvgIconModule,
        TranslationModule.forRoot(l10nConfig),
        BrowserAnimationsModule
      ],
      declarations: [
        DashboardComponent,
        LoginComponent,
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
      providers: [
        AuthService,
        {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
        },
        LocaleService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
