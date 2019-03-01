import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabelComponent } from './edit-label.component';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditLabelComponent', () => {
  let component: EditLabelComponent;
  let fixture: ComponentFixture<EditLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AngularSvgIconModule,
        FormsModule,
        HttpClientModule,
        AmazingTimePickerModule,
        BrowserAnimationsModule
      ],
      declarations: [EditLabelComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
