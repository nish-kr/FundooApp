import { Component, OnInit, Injectable, SimpleChanges, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ChildActivationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NotesModel } from "../models/notes.model";
import { log } from 'util';
import { NotesComponent } from '../notes/notes.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-addnote',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})

@Injectable()
export class AddnoteComponent implements OnInit {

  isOpen: Boolean;
  parentMessage: boolean;
  noteData: any;
  rowCol: any;
  notes: NotesModel = new NotesModel();
  title: String;
  note: String;
  data: any;
  color: any = "white";
  pinValue: Boolean = false;
  archiveValue: Boolean = false;
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
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // this.getNotes();
  }

  @ViewChild('child')
  public child: NotesComponent;
  ngOnInit() {
    const isOpen = false;
    this.getNotes();

  }

  addNote() {

    if (this.notes.note || this.notes.title) {
      // this.notes.note.replace(new RegExp('\n', 'g'), "<br />");
      let userCredentials = JSON.parse(localStorage.getItem("loginToken"));

      this.noteData = {
        title: this.notes.title,
        note: this.notes.note,
        reminder: "",
        pin: this.pinValue,
        trash: false,
        archive: this.archiveValue,
        color: this.color,
        userId: userCredentials.userId
      }

      this.httpService.post(this.noteData, "addNote").subscribe(
        data => {
          console.log("Data sent", data);
          this.isOpen = false;
          // alert("Registration Successful");
          if (this.archiveValue) {
            this.snackBar.open("Note Archived!", "Okay!", { duration: 2000 })
          } else {
            this.snackBar.open("Note addition Successful!", "Okay!", { duration: 2000 })
          }

          this.color = "white";
          // this.router.navigateByUrl('/login');
        },
        error => {
          this.snackBar.open("Note addition Unsuccessful! Invalid Input(s) / Internal Error!", "Okay!", { duration: 2000 })
          console.log("Internal HTTP Error: ", error);
        }
      )
      console.log(this.notes.title, " title ", this.notes.note);
      this.notes.title = null;
      this.notes.note = null;
      this.getNotes();
    } else {
      this.color = "white";
      console.log("Empty note!");
    }
  }

  getNotes() {
    let userCredentials = JSON.parse(localStorage.getItem("loginToken"));
    this.rowCol = "row";
    var getNotesObj = {
      userId: userCredentials.userId,
      token: userCredentials.loginToken
    }

    this.httpService.post(getNotesObj, 'getNotes').subscribe(
      data => {
        this.data = data;
        this.child.getNotes()
      },
      error => {
        console.log(error);
      }
    )
    return this.data;
  }

  changeColor(color) {
    this.color = color;
  }

  changePinValue() {
    if (this.pinValue == true) {
      // console.log(this.pinValue);
      this.pinValue = false;
    } else {
      // console.log(this.pinValue);
      this.pinValue = true;
    }
  }
}