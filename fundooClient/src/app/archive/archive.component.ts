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
    this.view.currentMessage.subscribe(message => this.rowCol = message)
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
}
