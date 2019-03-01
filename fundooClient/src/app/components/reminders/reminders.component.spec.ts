import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersComponent } from './reminders.component';
import { MaterialModule } from 'src/app/material.module';
import { SvgIconComponent, AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardsComponent } from '../cards/cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RemindersComponent', () => {
  let component: RemindersComponent;
  let fixture: ComponentFixture<RemindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientModule,
        FlexLayoutModule,
        AngularSvgIconModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        RemindersComponent,
        CardsComponent
      ]
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
