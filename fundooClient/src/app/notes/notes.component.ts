import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit {

  // @Input() noteData: any;

  data: any;
  rowCol: any;
  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.getNotes();
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
      },
      error => {
        console.log(error);
      }
    )
  }
}