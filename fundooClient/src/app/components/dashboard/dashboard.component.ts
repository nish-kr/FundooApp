import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AddnoteComponent } from '../addnote/addnote.component';
import { ChangeviewService } from 'src/app/services/changeview.service';
import { ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { HttpService } from 'src/app/services/http.service';

// Language Change
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { UserCredentials } from 'src/app/models/userCredentials.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoginComponent, AddnoteComponent]
  // encapsulation: ViewEncapsulation.Emulated
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    // media: MediaMatcher,
    public login: LoginComponent,
    public addNote: AddnoteComponent,
    public dialog: MatDialog,
    private data: ChangeviewService,
    private httpService: HttpService,
    public locale: LocaleService,
    public translation: TranslationService
  ) { }

  @Language() lang: string;
  title: any;

  headerName = {
    title: String,
    header: String,
    notes: String,
    reminders: String,
    editLabels: String,
    archive: String,
    trash: String,
    search: String
  };

  public icon = 'dashboard';
  public name: String="";
  public email: String="";
  public viewToolTip = 'Grid View';
  public view = 'row';
  // public headerName = "Fundoo Notes";
  public accountImage: any="";
  public labels: any;
  public labelName = [];

  url: string;

  ngOnInit() {
    const userCredentials:UserCredentials = JSON.parse(localStorage.getItem('loginToken'));
    this.data.currentMessage.subscribe(message => this.view = message);
    // let userCredentials = this.login.userNameEmail;
    if(userCredentials !== null){
      this.accountImage = userCredentials.name[0];
      this.name = userCredentials.name;
      this.email = userCredentials.email;
    }

    this.getLabel();

    this.translation.translationChanged().subscribe(
      () => {
        this.headerName.title = this.translation.translate('title');
        this.headerName.notes = this.translation.translate('notes');
        this.headerName.header = this.translation.translate('header');
        this.headerName.reminders = this.translation.translate('reminders');
        this.headerName.editLabels = this.translation.translate('editLabels');
        this.headerName.archive = this.translation.translate('archive');
        this.headerName.trash = this.translation.translate('trash');
        this.headerName.search = this.translation.translate('search');
      }
    );
  }

  selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language);
  }

  getLabel() {

    const userCredentials = JSON.parse(localStorage.getItem('loginToken'));

    let userData;
    if(userCredentials !== null){
      userData = {
        userId: userCredentials.userId,
      };
    }
    

    this.httpService.post(userData, 'getLabel').subscribe(
      data => {
        // console.log(data);
        this.labelName = [];
        this.labels = data;
        for (let i = 0; i < this.labels.length; i++) {
          if (this.labelName.indexOf(this.labels[i].labelName) === -1) {
            this.labelName.push(this.labels[i].labelName);
            // console.log(this.labelName)
          } else {
            // console.log('else');
          }
        }
        // this.labels = data;

        // for (let i = 0; i < this.labels.length; i++) {
        //   this.labelName.push(this.labels[i].labelName);
        // }
        // console.log(this.labelName);
      },
      err => {
        console.log(err);
      }
    );
    // this.labels
  }

  editLabel() {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      data: this.labelName
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
    );
  }

  navigateToLabel(item) {
    console.log(item);
    this.headerName.title = item;

    const userCredentials = JSON.parse(localStorage.getItem('loginToken'));


    const label = {
      labelName: item,
      userId: userCredentials.userId
    };

    console.log('label details', label);


    this.httpService.post(label, 'getLabelNotes').subscribe(
      data => {
        console.log(data);
        // this.router.navigateByUrl('dashboard/label'), data;
      },
      err => {

      });

    // this.router.navigateByUrl('dashboard/label');
    // this.child.labelName = item;
  }

  logout() {
    this.router.navigateByUrl('/login');
    console.log(localStorage.getItem('loginToken'));
    localStorage.clear();
  }

  toggleGridListIcon() {
    if (this.icon === 'view_agenda_outline') {
      this.icon = 'dashboard';
      this.viewToolTip = 'Grid View';
      this.data.changeMessage('row');
      // console.log("row");

    } else {
      this.icon = 'view_agenda_outline';
      this.viewToolTip = 'List View';
      this.data.changeMessage('column');
      // console.log("column");
    }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        console.log(event, 'adsssssssssssssss');

      };
    }
  }
}
