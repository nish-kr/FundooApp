import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AddnoteComponent } from "../addnote/addnote.component";
import { ChangeviewService } from '../changeview.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoginComponent, AddnoteComponent]
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public icon = 'dashboard';
  public name: String;
  public email: String;
  public viewToolTip = 'Grid View';
  public view = 'row';
  constructor(
    private router: Router,
    // media: MediaMatcher,
    public login: LoginComponent,
    public addNote: AddnoteComponent,
    private data: ChangeviewService
  ) { }

  ngOnInit() {
    let userCredentials = JSON.parse(localStorage.getItem("loginToken"));
    this.data.currentMessage.subscribe(message => this.view = message);
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
      this.icon = 'dashboard';
      this.viewToolTip = "Grid View";
      this.data.changeMessage("row");
      // console.log("row");

    } else {
      this.icon = 'view_agenda_outline';
      this.viewToolTip = "List View";
      this.data.changeMessage("column");
      // console.log("column");
    }
  }
}
