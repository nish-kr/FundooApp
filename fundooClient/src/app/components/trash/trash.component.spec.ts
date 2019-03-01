import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashComponent } from './trash.component';
import { MaterialModule } from 'src/app/material.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

describe('TrashComponent', () => {
  let component: TrashComponent;
  let fixture: ComponentFixture<TrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AngularSvgIconModule,
        FlexLayoutModule,
        HttpClientModule
      ],
      declarations: [TrashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
