import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material';
import { ChangeviewService } from '../changeview.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})

export class ArchiveComponent implements OnInit {

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

  unarchiveNote(item) {
    // console.log(item);
    item.archive=false;
    console.log(item);
    this.httpService.post(item, 'archiveNote').subscribe(
      data => {
        console.log('archive: ', data);
        this.snackBar.open("Note Unarchived!", "Okay!", { duration: 2000 });
      },
      error => {
        console.log(error);
      }
    )
  }
}
