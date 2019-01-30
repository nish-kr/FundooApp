import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AddnoteComponent } from "../addnote/addnote.component";
import { ChangeviewService } from 'src/app/services/changeview.service';
import { ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoginComponent, AddnoteComponent],
  encapsulation: ViewEncapsulation.Emulated
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public icon = 'dashboard';
  public name: String;
  public email: String;
  public viewToolTip = 'Grid View';
  public view = 'row';
  public headerName = "Fundoo Notes";
  public accountImage: any;
  public labels: any;
  public labelName = [];
  constructor(
    private router: Router,
    // media: MediaMatcher,
    public login: LoginComponent,
    public addNote: AddnoteComponent,
    public dialog: MatDialog,
    private data: ChangeviewService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    let userCredentials = JSON.parse(localStorage.getItem("loginToken"));
    this.data.currentMessage.subscribe(message => this.view = message);
    // let userCredentials = this.login.userNameEmail;
    this.accountImage = userCredentials.name[0];
    this.name = userCredentials.name;
    this.email = userCredentials.email;
    this.getLabel();
  }

  getLabel() {

    let userCredentials = JSON.parse(localStorage.getItem("loginToken"));

    var userData = {
      userId: userCredentials.userId,
    }

    this.httpService.post(userData, 'getLabel').subscribe(
      data => {
        console.log(data);
        this.labels = data;
        this.labelName = [];
        for (let i = 0; i < this.labels.length; i++) {
          this.labelName.push(this.labels[i].labelName);
        }
        console.log(this.labelName);
      },
      err => {
        console.log(err);
      }
    )
    // this.labels
  }

  editLabel() {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      data: this.labels
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getLabel();

      // this.httpService.post(, 'updateNote').subscribe(
      // data => {
      // console.log('updated: ', data);
      // this.snackBar.open("Note Edited!", "Okay", { duration: 3000 });
      // },
      // error => {
      // console.log(error);
    }
    )
  }

  navigateToLabel(item) {
    console.log(item);
    this.headerName = item;
    // this.router.navigateByUrl('/label');
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

  url: string;
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        console.log("adsssssssssssssss");

      }
    }
  }
}
