import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from "../http.service";
import { Router } from '@angular/router';
import { ForgotPasswordModel } from "../models/forgotpassword.model";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  user: ForgotPasswordModel = new ForgotPasswordModel();
  forgotPasswordForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]]
    });
  }

  onForgotPassword() {

    var userData = {
      email: this.user.email,
    }

    this.httpService.post(userData, "forgotPassword").subscribe(
      data => {
        console.log("Data sent", data);
        alert("Email Sent Successful! Check your inbox!");
        this.router.navigateByUrl('/login');
      },
      error => {
        alert("Email Sent Unsuccessful! Internal Error!");
        console.log("Internal HTTP Error: ", error);
      }
    );
  }
}
