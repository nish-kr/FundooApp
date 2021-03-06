import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from 'src/app/services/http.service';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  // noteTitle: any = this.data.title;
  // noteContent: any = this.data.note;
  pinnedIconSrc = '../../assets/Icons/pinIcon.svg';
  unpinnedIconSrc = '../../assets/Icons/unpinIcon.svg';
  // pinValue: Boolean = this.data.pin;
  title: any = 'Title';
  content: any = 'Note';
  reminderMenuBool: Boolean = true;
  showReminderMenu: Boolean;
  dateInput: Date;
  timeInput: String;
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
    public dialogRef: MatDialogRef<EditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private atp: AmazingTimePickerService
  ) { }

  ngOnInit() {
  }

  toggleReminderMenu() {
    if (this.reminderMenuBool == true) {
      this.reminderMenuBool = false;
    } else {
      this.reminderMenuBool = true;
    }
  }

  toggleShowReminder() {
    if (this.showReminderMenu == true) {
      this.showReminderMenu = false;
    } else {
      this.showReminderMenu = true;
    }
  }

  openTimeSelector() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.timeInput = time;
    });
  }

  setReminder() {
    this.data.reminder = this.dateInput.toLocaleDateString() + ', ' + this.timeInput;

    console.log(this.dateInput.toLocaleDateString(), '++++', this.timeInput);

    this.httpService.post(this.data, 'updateNote').subscribe(
      data => {
        console.log(data);
        // this.messageEvent.emit("Emitted from child");
        // this.snackBar.open("Note Edited!", "Okay", { duration: 3000 });
      },
      error => {
        console.log(error);
      }
    );
  }

  removeReminder() {
    this.data.reminder = '';
    this.httpService.post(this.data, 'updateNote').subscribe(
      data => {
        console.log(data);
        // this.messageEvent.emit("Emitted from child");
        // this.snackBar.open("Note Edited!", "Okay", { duration: 3000 });
      },
      error => {
        console.log(error);
      }
    );
  }

  changePinValue() {
    if (this.data.pin == true) {
      // console.log(this.data.pin);
      this.data.pin = false;
    } else {
      // console.log(this.data.pin);
      this.data.pin = true;
    }
  }

  deleteImage() {
    this.httpService.post(this.data, 'deleteImage').subscribe(
      data => {
        console.log('after image delete', data);
        this.data.image = null;
        // this.snackBar.open('Image Deleted', 'Okay', { duration: 2000 });
      },
      err => {
        console.log(err);
      }
    )
  }
}
