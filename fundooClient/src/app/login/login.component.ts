import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from "../models/login.model";
import { HttpService } from "../http.service";
import { Router } from '@angular/router';

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
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
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
        console.log("Login successful", data);
        // localStorage.setItem("tokenReceived", data.loginToken);
        
        // console.log("token on client side", localStorage.getItem("tokenReceived"));
        
        alert("Login Successful!");
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