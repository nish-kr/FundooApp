import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginModel } from 'src/app/models/login.model';
import { HttpService } from 'src/app/services/http.service';
// import { DashboardComponent } from '../dashboard/dashboard.component';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

@Injectable()
export class LoginComponent implements OnInit {

  user: LoginModel = new LoginModel();
  registerForm: FormGroup;
  hide = true;
  public userNameEmail = {
    name: String,
    userId: String
  };
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar,
    // private dashboard: DashboardComponent
    private socialAuthService: AuthService
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

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    // if(socialPlatform == "facebook"){
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // }else 
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        this.onSocialLogin(userData);
      }
    );
  }


  // signInWithFB() {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  // signOut() {
  //   this.authService.signOut();
  // }

  onSocialLogin(data) {
    var firstName = data.name.split(' ')[0];
    var lastName = data.name.split(' ')[1];

    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: data.email,
      image: data.image
    }

    console.log(userData);

    localStorage.setItem("loginToken", JSON.stringify(userData));

    // this.router.navigateByUrl('/dashboard');

  }

  onRegisterSubmit() {

    var userData = {
      email: this.user.email,
      password: this.user.password
    }

    this.httpService.post(userData, "login").subscribe(
      (data) => {
        // let userNameEmail = {
        //   name: data.name,
        //   email: this.user.email
        // };
        //  = userNameEmail;
        // this.dashboard.name = userNameEmail.name;
        console.log("Login successful", data);

        localStorage.setItem("loginToken", JSON.stringify(data));

        console.log("token on client side", localStorage.getItem("loginToken"));

        this.userNameEmail.name = JSON.parse(localStorage.getItem("loginToken")).name;

        // this.userNameEmail.email = JSON.parse(this.user.email);

        this.snackBar.open("Login Successful!", "Okay!", { duration: 2000 })

        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
        console.log("Invalid Credentials! ", error);
        this.snackBar.open("Login Unsuccessful! Invalid Credentials!", "Okay!", { duration: 2000 });
        // alert('Invalid Credentials');
      }
    );
  }
}