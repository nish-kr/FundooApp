import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/services/http.service';
import { ChangeviewService } from 'src/app/services/changeview.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  data: any;
  rowCol: any = 'column';
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
    const userCredentials = JSON.parse(localStorage.getItem('loginToken'));
    let getNotesObj

    if (userCredentials != null) {
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

  restoreNote(item) {
    // console.log(item);
    item.trash = false;
    console.log(item);
    this.httpService.post(item, 'deleteNote').subscribe(
      data => {
        console.log('delete: ', data);
        if (item.pin) {
          this.snackBar.open('Note Restored & Pinned!', 'Okay!', { duration: 2000 });
        } else {
          this.snackBar.open('Note Restored!', 'Okay!', { duration: 2000 });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteForever(item) {
    console.log(item);
    this.httpService.post(item, 'deleteNoteForever').subscribe(
      data => {
        console.log('deleted: ', data);
        const index = this.data.indexOf(item);
        // console.log(index);
        this.data.splice(index);
        this.snackBar.open('Note Deleted Permanently!', 'Okay!', { duration: 2000 });
      },
      error => {
        console.log(error);
      }
    );
  }
}
