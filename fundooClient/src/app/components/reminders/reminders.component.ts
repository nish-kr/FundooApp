import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material';
import { ChangeviewService } from 'src/app/services/changeview.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {

  pinnedIconSrc = '../../assets/Icons/pinIcon.svg';
  unpinnedIconSrc = '../../assets/Icons/unpinIcon.svg';
  data: any;
  notes: Array<Object> = [];
  rowCol: any = 'column';
  pinValue: Boolean = false;
  counter = 0;
  reminderMenuBool: Boolean = true;
  showReminderMenu: Boolean;
  reminderMenu: String = 'reminderMenu';
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  nextWeekDay: String = this.days[new Date().getDay()];
  colorCode: Array<Object> = [
    { name: 'white', colorCode: 'rgb(255, 255, 255)' },
    { name: 'lightGreen', colorCode: 'rgb(204, 255, 144)' },
    { name: 'purple', colorCode: 'rgb(215, 174, 251)' },
    { name: 'red', colorCode: 'rgb(242, 139, 130)' },
    { name: 'Teal', colorCode: 'rgb(167, 255, 235)' },
    { name: 'pink', colorCode: 'rgb(253, 207, 232)' },
    { name: 'orange', colorCode: 'rgb(251, 188, 4)' },
    { name: 'blue', colorCode: 'rgb(203, 240, 248)' },
    { name: 'brown', colorCode: 'rgb(230, 201, 168)' },
    { name: 'yellow', colorCode: 'rgb(255, 244, 117)' },
    { name: 'darkBlue', colorCode: 'rgb(174, 203, 250)' },
    { name: 'gray', colorCode: 'rgb(232, 234, 237)' }
  ];
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
    const userCredentials = JSON.parse(localStorage.getItem('loginToken'));
    const getNotesObj = {
      userId: userCredentials.userId,
      token: userCredentials.loginToken
    };
    this.httpService.post(getNotesObj, 'getNotes').subscribe(
      data => {
        this.data = data;
        // console.log('notesComponent: ', data);
        let count = 0;
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].pin && !this.data[i].trash && !this.data[i].archive) {
            this.notes.push(this.data[i]);
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
    );
  }

  receiveMessage($event) {
    console.log('Message recieved from child: ', $event);
    this.getNotes();
  }
}
