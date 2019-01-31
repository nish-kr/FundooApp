import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {

  labelNames: Array<any> = [];
  constructor(
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.labelNames = this.data;
  }

  createLabel(label) {

    // let headers = new HttpHeaders();
    // headers.append('token', 'VeTTgA7fDiwD2fWhQ');
    // headers.set('Token', 'VeTTgA7fDiwD2fWhQ');

    // const data = new FormData();
    // data.append('offer', JSON.stringify(this.offer));

    // this.HttpClient.post('http:host/app/api/offer', data, {headers: headers})

    console.log(label);
    // label = null;

    let userCredentials = JSON.parse(localStorage.getItem("loginToken"));

    var newLabel = {
      labelName: label,
      userId: userCredentials.userId,
      noteId: ''
    }

    console.log(newLabel);

    this.httpService.post(newLabel, 'addLabel').subscribe(
      data => {
        console.log(data);
        this.labelNames.push(newLabel.labelName);
        // console.log(this.labelNames)
      },
      err => {
        console.log('add label error', err);
      });

    // console.log(this.labelName);

  }

  deleteLabel(item) {
    // item = null;

    let userCredentials = JSON.parse(localStorage.getItem("loginToken"));
    console.log(item);
    var label = {
      labelName: item
    }

    this.httpService.post(label, 'deleteLabel').subscribe(
      data => {
        const i = this.labelNames.indexOf(item);
        if (i !== -1) {
          this.data.splice(i, 1);
        }
        // this.labelNames.
        console.log('deleted! ', data);

      },
      err => {
        console.log('add label error', err);
      });
  }
}
