import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from "../models/login.model";
import { HttpService } from "../http.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user: LoginModel = new LoginModel();
  registerForm: FormGroup;
  hide = true;
  userNameEmail={
    name: String,
    email: String
  };
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
  }

  onRegisterSubmit() {
    
    var userData = {
      email: this.user.email,
      password: this.user.password
    }

    this.httpService.post(userData, "login").subscribe(
      data => {
        let userNameEmail={
          // name: data.name,
          email: this.user.email
        };
        console.log("Login successful", userNameEmail, " ", data);
        // localStorage.setItem("tokenReceived", data.loginToken);
        
        // console.log("token on client side", localStorage.getItem("tokenReceived"));
        
        // alert("Login Successful!");
        this.snackBar.open("Login Successful!", "Okay!", { duration: 2000 })

        this.router.navigateByUrl('/dashboard');
      },
      error => {
        console.log("Invalid Credentials! ", error);
        alert("Login Unsuccessful! Invalid Credentials!");
        alert('Invalid Credentials');
      }
    );
  }
}