import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelComponent } from './label.component';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        MaterialModule,
        HttpClientModule
       ],
      declarations: [ LabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
