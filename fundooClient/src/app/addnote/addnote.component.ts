import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NotesModel } from "../models/notes.model";

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {

  notes: NotesModel = new NotesModel();
  title: String;
  note: String;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const isOpen = false;
  }

  addNote() {

    if (this.notes.note || this.notes.title) {
      let userCredentials = JSON.parse(localStorage.getItem("loginToken"));

      var noteData = {
        title: this.notes.title,
        note: this.notes.note,
        reminder: "",
        pin: false,
        trash: false,
        archive: false,
        color: "",
        userId: userCredentials.userId
      }

      this.httpService.post(noteData, "addNote").subscribe(
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

    } else {
      console.log("Empty note!");
    }
  }

}