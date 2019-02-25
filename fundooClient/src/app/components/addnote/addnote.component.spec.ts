import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnoteComponent } from './addnote.component';
import { MaterialModule } from 'src/app/material.module';
import { SvgIconComponent, AngularSvgIconModule } from 'angular-svg-icon';
import { NotesComponent } from '../notes/notes.component';

describe('AddnoteComponent', () => {
  let component: AddnoteComponent;
  let fixture: ComponentFixture<AddnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AngularSvgIconModule,
      ],
      declarations: [
        AddnoteComponent,
        NotesComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
