import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material';
import { ChangeviewService } from '../changeview.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit {

  data: any;
  rowCol: any = "column";
  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private view: ChangeviewService
  ) { }

  ngOnInit() {
    this.view.currentMessage.subscribe(message => this.rowCol = message);
  }

  getNotes() {
    let userCredentials = JSON.parse(localStorage.getItem("loginToken"));
    var getNotesObj = {
      userId: userCredentials.userId,
      token: userCredentials.loginToken
    }
    this.httpService.post(getNotesObj, 'getNotes').subscribe(
      data => {
        this.data = data;
        // console.log('notesComponent: ', data);
      },
      error => {
        console.log(error);
      }
    )
  }

  archiveNote(item) {
    item.archive=true;
    console.log(item);
    this.httpService.post(item, 'archiveNote').subscribe(
      data => {
        console.log('archived: ', data);
        this.snackBar.open("Note Archived!", "Okay!", { duration: 2000 });
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteNote(item) {
    item.trash=true;
    console.log(item);
    this.httpService.post(item, 'deleteNote').subscribe(
      data => {
        console.log('deleted: ', data);
        this.snackBar.open("Note Moved to Trash!", "Okay!", { duration: 2000 });
      },
      error => {
        console.log(error);
      }
    )
  }
}