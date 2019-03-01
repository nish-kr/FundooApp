import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';
import { MaterialModule } from 'src/app/material.module';
import {  AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AmazingTimePickerModule } from 'amazing-time-picker';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AngularSvgIconModule,
        FormsModule,
        HttpClientModule,
        AmazingTimePickerModule
      ],
      declarations: [ CardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
