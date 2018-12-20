import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoginComponent],
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public icon = 'view_agenda_outline';
  public name: String;
  public email: String;
  public view = 'List View';
  constructor(
    private router: Router,
    // media: MediaMatcher,
    public login: LoginComponent,
  ) { }

  ngOnInit() {
    let userCredentials = JSON.parse(localStorage.getItem("loginToken"));

    // let userCredentials = this.login.userNameEmail;
    this.name = userCredentials.name;
    this.email = userCredentials.email;

  }

  logout() {
    this.router.navigateByUrl('/login');
    console.log(localStorage.getItem('loginToken'));
    localStorage.clear();
  }

  toggleGridListIcon() {
    if (this.icon === 'view_agenda_outline') {
      this.icon = 'view_module';
      this.view = "Grid View";
    } else {
      this.icon = 'view_agenda_outline';
      this.view = "List View";
    }
  }
}
