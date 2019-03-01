import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../components/login/login.component';
import { LabelComponent } from '../components/label/label.component';
import { EditLabelComponent } from '../components/edit-label/edit-label.component';
import { EditCardComponent } from '../components/edit-card/edit-card.component';
import { CardsComponent } from '../components/cards/cards.component';
import { AddnoteComponent } from '../components/addnote/addnote.component';
import { TrashComponent } from '../components/trash/trash.component';
import { ArchiveComponent } from '../components/archive/archive.component';
import { RemindersComponent } from '../components/reminders/reminders.component';
import { NotesComponent } from '../components/notes/notes.component';
import { CofirmpasswordDirective } from '../cofirmpassword.directive';
import { ResetpasswordComponent } from '../components/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from '../components/forgotpassword/forgotpassword.component';
import { RegisterComponent } from '../components/register/register.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslationModule, L10nConfig, LogLevel, StorageStrategy, ProviderType } from 'angular-l10n';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

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

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppRoutingModule,
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
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
