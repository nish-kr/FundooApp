import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { RegisterModel } from 'src/app/models/register.model';
import { HttpService } from 'src/app/services/http.service';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
//     const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

//     return (invalidCtrl || invalidParent);
//   }
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  hide = true;
  // matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
 
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'firstName': [this.user.firstName, [
        Validators.required
      ]],
      'lastName': [this.user.lastName, [
        Validators.required
      ]],
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      'confirmPassword': [this.user.confirmPassword, [
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    },{ validator: this.checkPasswords });
  }

  onRegisterSubmit() {

    var userData = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password
    }

    this.httpService.post(userData, "register").subscribe(
      data => {
        console.log("Data sent", data);
        // alert("Registration Successful");
        this.snackBar.open("Registration Successful!", "Okay!", { duration: 2000 })
        this.router.navigateByUrl('/login');
      },
      error => {
        alert("Registration Unsuccessful! Invalid Input(s)!");
        console.log("Internal HTTP Error: ", error);
      }
    );
  }

  openSnackBar() {
    this.snackBar.open("Login Page!", "Okay!", { duration: 2000 })
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}