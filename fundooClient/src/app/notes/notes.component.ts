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
  pinValue: Boolean = false;
  counter: number = 0;
  colorCode: Array<Object> = [
    { name: "white", colorCode: "rgb(255, 255, 255)" },
    { name: "lightGreen", colorCode: "rgb(204, 255, 144)" },
    { name: "purple", colorCode: "rgb(215, 174, 251)" },
    { name: "red", colorCode: "rgb(242, 139, 130)" },
    { name: "Teal", colorCode: "rgb(167, 255, 235)" },
    { name: "pink", colorCode: "rgb(253, 207, 232)" },
    { name: "orange", colorCode: "rgb(251, 188, 4)" },
    { name: "blue", colorCode: "rgb(203, 240, 248)" },
    { name: "brown", colorCode: "rgb(230, 201, 168)" },
    { name: "yellow", colorCode: "rgb(255, 244, 117)" },
    { name: "darkBlue", colorCode: "rgb(174, 203, 250)" },
    { name: "gray", colorCode: "rgb(232, 234, 237)" }
  ]
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
        let count = 0;
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].pin == true) {
            this.pinValue = true;
            this.counter++;
            count++;
            break;
          }
        }
        if (count == 0) {
          this.counter = 0;
          this.pinValue = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  archiveNote(item) {
    item.archive = true;
    item.pin = false;
    // console.log(item);
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
    item.trash = true;
    item.pin = false;
    // console.log(item);
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

  pinNote(item) {
    item.pin = true;
    // this.pinValue = true;
    this.counter++;
    // console.log(item);
    this.httpService.post(item, 'pinNote').subscribe(
      data => {
        console.log('pinned: ', data);
        // this.getNotes();
        this.snackBar.open("Note Pinned!", "Okay!", { duration: 2000 });
      },
      error => {
        console.log(error);
      }
    )
  }

  unpinNote(item) {
    item.pin = false;
    // this.pinValue = false;
    this.counter--;
    // console.log(item);
    this.httpService.post(item, 'pinNote').subscribe(
      data => {
        console.log('unpinned: ', data);
        // this.getNotes();
        this.snackBar.open("Note Unpinned!", "Okay!", { duration: 2000 });
      },
      error => {
        console.log(error);
      }
    )
  }

  changeColor(color,item){
    item.color=color;
    console.log(item," ",color);
  }
}