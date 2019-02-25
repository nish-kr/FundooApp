import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardComponent } from './edit-card.component';
import { MaterialModule } from 'src/app/material.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatDialogRef } from '@angular/material';

describe('EditCardComponent', () => {
  let component: EditCardComponent;
  let fixture: ComponentFixture<EditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AngularSvgIconModule
      ],
      declarations: [EditCardComponent],
      providers: [MatDialogRef]
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
