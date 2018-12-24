import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AddnoteComponent } from "../addnote/addnote.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoginComponent, AddnoteComponent]
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
    public addNote: AddnoteComponent
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
      this.icon = 'dashboard';
      this.view = "Grid View";
      this.addNote.rowCol = "row";
      // this.addNote.getNotes();
      console.log(this.addNote.rowCol);

    } else {
      this.icon = 'view_agenda_outline';
      this.view = "List View";
      this.addNote.rowCol = "column";
      // this.addNote.getNotes();
      console.log(this.addNote.rowCol);

    }
  }
}
