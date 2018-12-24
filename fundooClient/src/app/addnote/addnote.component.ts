import { Component, OnInit, Injectable, SimpleChanges, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ChildActivationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NotesModel } from "../models/notes.model";
import { log } from 'util';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})

@Injectable()
export class AddnoteComponent implements OnInit {

  parentMessage: boolean;
  noteData: any;
  rowCol: any;
  notes: NotesModel = new NotesModel();
  title: String;
  note: String;
  data: any;
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
      let userCredentials = JSON.parse(localStorage.getItem("loginToken"));

      this.noteData = {
        title: this.notes.title,
        note: this.notes.note,
        reminder: "",
        pin: false,
        trash: false,
        archive: false,
        color: "white",
        userId: userCredentials.userId
      }

      this.httpService.post(this.noteData, "addNote").subscribe(
        data => {
          console.log("Data sent", data);
          // alert("Registration Successful");
          this.snackBar.open("Note addition Successful!", "Okay!", { duration: 2000 })
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

}