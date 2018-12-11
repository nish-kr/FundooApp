import { Component, OnInit } from '@angular/core';
import { RegisterModel } from "../models/register.model";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from "../http.service";
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  hide = true;

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
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
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
}