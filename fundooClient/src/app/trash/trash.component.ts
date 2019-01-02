import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material';
import { ChangeviewService } from '../changeview.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  data: any;
  rowCol: any = "column";
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
    let userCredentials = JSON.parse(localStorage.getItem("loginToken"));
    var getNotesObj = {
      userId: userCredentials.userId,
      token: userCredentials.loginToken
    }
    this.httpService.post(getNotesObj, 'getNotes').subscribe(
      data => {
        this.data = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  restoreNote(item) {
    // console.log(item);
    item.trash = false;
    console.log(item);
    this.httpService.post(item, 'deleteNote').subscribe(
      data => {
        console.log('delete: ', data);
        this.snackBar.open("Note Restored!", "Okay!", { duration: 2000 });
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteForever(item) {
    console.log(item);
    this.httpService.post(item, 'deleteNoteForever').subscribe(
      data => {
        console.log('deleted: ', data);
        var index = this.data.indexOf(item);
        // console.log(index);
        this.data.splice(index);
        this.snackBar.open("Note Deleted Permanently!", "Okay!", { duration: 2000 });
      },
      error => {
        console.log(error);
      }
    )
  }
}
