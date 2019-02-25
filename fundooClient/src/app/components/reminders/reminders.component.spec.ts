import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersComponent } from './reminders.component';
import { MaterialModule } from 'src/app/material.module';
import { SvgIconComponent } from 'angular-svg-icon';

describe('RemindersComponent', () => {
  let component: RemindersComponent;
  let fixture: ComponentFixture<RemindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        SvgIconComponent
      ],
      declarations: [ RemindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
