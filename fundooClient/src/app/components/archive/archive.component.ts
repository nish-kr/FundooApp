import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/services/http.service';
import { ChangeviewService } from 'src/app/services/changeview.service';
import { UserCredentials } from 'src/app/models/userCredentials.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})

export class ArchiveComponent implements OnInit {

  data: any;
  rowCol: any = 'column';
  colorCode: Array<Object> = [
    { name: 'white', colorCode: 'rgb(255, 255, 255)' },
    { name: 'lightGreen', colorCode: 'rgb(204, 255, 144)' },
    { name: 'purple', colorCode: 'rgb(215, 174, 251)' },
    { name: 'red', colorCode: 'rgb(242, 139, 130)' },
    { name: 'Teal', colorCode: 'rgb(167, 255, 235)' },
    { name: 'pink', colorCode: 'rgb(253, 207, 232)' },
    { name: 'orange', colorCode: 'rgb(251, 188, 4)' },
    { name: 'blue', colorCode: 'rgb(203, 240, 248)' },
    { name: 'brown', colorCode: 'rgb(230, 201, 168)' },
    { name: 'yellow', colorCode: 'rgb(255, 244, 117)' },
    { name: 'darkBlue', colorCode: 'rgb(174, 203, 250)' },
    { name: 'gray', colorCode: 'rgb(232, 234, 237)' }
  ];
  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private view: ChangeviewService
  ) { }

  ngOnInit() {
    this.view.currentMessage.subscribe(message => this.rowCol = message);
    this.getNotes();
  }

  getNotes() {
    const userCredentials : UserCredentials = JSON.parse(localStorage.getItem('loginToken'));

    let getNotesObj;
    if(userCredentials !== null){
      getNotesObj = {
        userId: userCredentials.userId,
        token: userCredentials.loginToken
  
      };
    }
    this.httpService.post(getNotesObj, 'getNotes').subscribe(
      data => {
        this.data = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  unarchiveNote(item) {
    // console.log(item);
    item.archive = false;
    // console.log(item);
    this.httpService.post(item, 'archiveNote').subscribe(
      data => {
        console.log('archive: ', data);
        if (item.pin) {
          this.snackBar.open('Note Unarchived & Pinned!', 'Okay!', { duration: 2000 });
        } else {
          this.snackBar.open('Note Unarchived!', 'Okay!', { duration: 2000 });
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  deleteNote(item) {
    item.trash = true;
    item.pin = false;
    // console.log(item);
    this.httpService.post(item, 'deleteNote').subscribe(
      data => {
        console.log('deleted: ', data);
        this.snackBar.open('Note Moved to Trash!', 'Okay!', { duration: 2000 });
      },
      error => {
        console.log(error);
      }
    );
  }

  changeColor(color, item) {
    item.color = color;
    // console.log(item," ",color);
    this.httpService.post(item, 'changeColor').subscribe(
      data => {
        console.log('colorchange: ', data);
        // this.getNotes();
        // this.snackBar.open("Color Changed!", "Okay!", { duration: 2000 });
      },
      error => {
        console.log(error);
      }
    );
  }
}
