import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardComponent } from './edit-card.component';
import { MaterialModule } from 'src/app/material.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmazingTimePickerModule } from 'amazing-time-picker';

describe('EditCardComponent', () => {
  let component: EditCardComponent;
  let fixture: ComponentFixture<EditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AngularSvgIconModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AmazingTimePickerModule
      ],
      declarations: [EditCardComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
