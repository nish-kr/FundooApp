import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

describe('RegisterComponent', () => {
  let comp: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
      ]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(RegisterComponent);

      comp = fixture.componentInstance; // ContactComponent test instance
      // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it(`form should be invalid`, async(() => {
    comp.registerForm.controls['firstName'].setValue('');
    comp.registerForm.controls['lastName'].setValue('');
    comp.registerForm.controls['email'].setValue('');
    comp.registerForm.controls['password'].setValue('');
    expect(comp.registerForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.registerForm.controls['firstName'].setValue('Nishant');
    comp.registerForm.controls['lastName'].setValue('Kumar');
    comp.registerForm.controls['email'].setValue('abc@xyz.com');
    comp.registerForm.controls['password'].setValue('asdasds');
    expect(comp.registerForm.valid).toBeTruthy();
  }));
});
