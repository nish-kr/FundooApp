import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http.service';
import { ChangeviewService } from 'src/app/services/changeview.service';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { Time } from '@angular/common';
import { isDate } from 'util';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() item: any;
  @Input() pinIconSrc: any;

  @Output() messageEvent = new EventEmitter<String>();

  // pinIconSrc: any = "../../assets/Icons/unpinIcon.svg";
  data: any;
  rowCol: any = 'column';
  pinValue: Boolean = false;
  pinToolTip: any;
  counter = 0;
  reminderMenuBool: Boolean = true;
  showReminderMenu: Boolean;
  // reminderMenu: String = "reminderMenu";
  dateInput: Date;
  timeInput: String;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  nextWeekDay: String = this.days[new Date().getDay()];
  imageUrl: any;
  allLabels: any;
  labels: any = [];
  chosenLabel: any = [];
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
    private view: ChangeviewService,
    public dialog: MatDialog,
    private atp: AmazingTimePickerService
  ) { }

  ngOnInit() {
    this.getLabel();
    this.getChosenLabel();
    // this.messageEvent.emit("Emitted from child")
  }


  getLabel() {

    const userCredentials = JSON.parse(localStorage.getItem('loginToken'));

    const userData = {
      userId: userCredentials.userId,
    };

    this.httpService.post(userData, 'getLabel').subscribe(
      data => {
        // console.log(data);
        this.allLabels = data;
        for (let i = 0; i < this.allLabels.length; i++) {
          if (this.labels.indexOf(this.allLabels[i].labelName) === -1) {
            this.labels.push(this.allLabels[i].labelName);
            // console.log(this.labels);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
    // this.labels
  }

  getChosenLabel() {

    const userCredentials = JSON.parse(localStorage.getItem('loginToken'));

    const userData = {
      userId: userCredentials.userId,
      noteId: this.item._id
    };

    this.httpService.post(userData, 'getChosenLabel').subscribe(
      data => {
        // console.log(data);
        this.chosenLabel = data;
        // console.log('chosenLabels',this.chosenLabel);

        // this.allLabels = data;
        // for (let i = 0; i < this.allLabels.length; i++) {
        //   if (this.labels.indexOf(this.allLabels[i].labelName) === -1) {
        //     this.labels.push(this.allLabels[i].labelName);
        //     // console.log(this.labels);
        //   }
        // }
      },
      err => {
        console.log(err);
      }
    );

  }

  addThisLabel(label) {

    console.log(label);

    const userCredentials = JSON.parse(localStorage.getItem('loginToken'));

    const newLabel = {
      labelName: label,
      userId: userCredentials.userId,
      noteId: this.item._id
    };

    console.log(newLabel);

    this.httpService.post(newLabel, 'addLabel').subscribe(
      data => {
        // console.log(data);

        const labelNow: any = data;
        for (let i = 0; i < labelNow.length; i++) {
          if (this.chosenLabel.indexOf(labelNow[i].labelName) === -1) {
            this.chosenLabel.push(labelNow[i].labelName);
            // console.log(this.labels);
          }
        }
        this.chosenLabel.push(newLabel);
        // console.log("after adding label in note", this.chosenLabel);

        // this.labels.push(newLabel);
        // console.log(this.labelNames)
      },
      err => {
        console.log('add label error', err);
      });

  }

  removeLabelFromNote(label) {

    const userCredentials = JSON.parse(localStorage.getItem('loginToken'));

    const toRemove = {
      _id: label._id,
      labelName: label.labelName,
      userId: userCredentials.userId,
      noteId: this.item._id,
      __v: 0
    };

    console.log('To remove: ', toRemove);

    this.httpService.post(toRemove, 'removeLabelFromNote').subscribe(
      data => {
        console.log('item to remove:', this.chosenLabel);
        this.messageEvent.emit('Emitted from child');
        console.log('Data from backend', data);

        // const i = this.chosenLabel.indexOf(toRemove);
        // if (i !== -1) {
        //   this.chosenLabel.splice(i, 1);
        // }

        // console.log(i, 'index & ', this.chosenLabel);


        // const labelNow: any = data;
        // for (let i = 0; i < labelNow.length; i++) {
        //   if (this.chosenLabel.indexOf(labelNow[i].labelName) === -1) {
        //     this.chosenLabel.push(labelNow[i].labelName);
        //     // console.log(this.labels);
        //   }
        // }
        // this.chosenLabel.push(toRemove);
        // console.log("after adding label in note", this.chosenLabel);

        // this.labels.push(newLabel);
        // console.log(this.labelNames)
      },
      err => {
        console.log('add label error', err);
      });
  }

  editCard(item) {
    const dialogRef = this.dialog.open(EditCardComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`, item);
      this.httpService.post(item, 'updateNote').subscribe(
        data => {
          console.log('updated: ', data);
          this.messageEvent.emit('Emitted from child');
          if (item.archive) {
            this.snackBar.open('Note Archived!', 'Okay', { duration: 3000 });
          } else if (item.trash) {
            this.snackBar.open('Note Deleted!', 'Okay', { duration: 3000 });
          } else {
            this.snackBar.open('Note Edited!', 'Okay', { duration: 3000 });
          }
        },
        error => {
          console.log(error);
        }
      );
    });

    // dialogRef.backdropClick().subscribe(result => {
    //   console.log(`Dialog result: ${result}`, item);
    //   this.httpService.post(item, 'updateNote').subscribe(
    //     data => {
    //       console.log('updated: ', data);
    //       this.messageEvent.emit("Emitted from child");
    //       this.snackBar.open("Note Edited!", "Okay", { duration: 3000 });
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   )
    // });
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
    this.item.reminder = this.dateInput.toLocaleDateString() + ', ' + this.timeInput;

    console.log(this.dateInput.toLocaleDateString(), '++++', this.timeInput);

    this.httpService.post(this.item, 'updateNote').subscribe(
      data => {
        console.log(data);
        this.messageEvent.emit('Emitted from child');
        // this.snackBar.open("Note Edited!", "Okay", { duration: 3000 });
      },
      error => {
        console.log(error);
      }
    );
  }

  removeReminder() {
    this.item.reminder = '';
    this.httpService.post(this.item, 'updateNote').subscribe(
      data => {
        console.log(data);
        this.messageEvent.emit('Emitted from child');
        // this.snackBar.open("Note Edited!", "Okay", { duration: 3000 });
      },
      error => {
        console.log(error);
      }
    );
  }

  onUpload(event) {

    const file = event.target.files[0];

    console.log(file);

    // if (file) {

    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      // console.log('imageUrl: ', this.imageUrl);
    };

    const fd = new FormData();
    fd.append('image', file);
    // console.log(fd);

    this.httpService.post(fd, 'imageUpload').subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log('image upload error', err);
      });
  }


  //   var FormData = require('form-data');
  // var http = require('http');

  // var form = new FormData();

  // http.request('http://nodejs.org/images/logo.png', function(response) {
  //   form.append('my_field', 'my value');
  //   form.append('my_buffer', new Buffer(10));
  //   form.append('my_logo', response);
  // });

  archiveNote(item) {
    item.archive = true;
    item.pin = false;
    // console.log(item);
    this.httpService.post(item, 'archiveNote').subscribe(
      data => {
        console.log('archived: ', data);
        this.messageEvent.emit('Emitted from child');
        const snackBarRef = this.snackBar.open('Note Archived!', 'Undo', { duration: 3000 });
        snackBarRef.onAction().subscribe(() => {
          // console.log("action cliked!");
          this.unarchiveNote(item);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  unarchiveNote(item) {
    // console.log(item);
    item.archive = false;
    // console.log(item);
    this.httpService.post(item, 'archiveNote').subscribe(
      data => {
        console.log('unarchive: ', data);
        this.messageEvent.emit('Emitted from child');
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteNote(item) {
    item.trash = true;
    item.pin = false;
    // console.log(item);
    this.httpService.post(item, 'deleteNote').subscribe(
      data => {
        console.log('deleted: ', data);
        this.messageEvent.emit('Emitted from child');
        const snackBarRef = this.snackBar.open('Note Trashed!', 'Undo', { duration: 3000 });
        snackBarRef.onAction().subscribe(() => {
          // console.log("action cliked!");
          this.restoreNote(item);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  restoreNote(item) {
    // console.log(item);
    item.trash = false;
    console.log(item);
    this.httpService.post(item, 'deleteNote').subscribe(
      data => {
        console.log('delete: ', data);
        this.messageEvent.emit('Emitted from child');
      },
      error => {
        console.log(error);
      }
    );
  }

  changePin(item) {
    if (item.pin) {
      item.pin = false;
    } else {
      item.pin = true;
    }

    // this.pinValue = true;
    this.counter++;
    // console.log(item);
    this.httpService.post(item, 'pinNote').subscribe(
      data => {
        this.messageEvent.emit('Emitted from child');
        if (item.pin) {
          // this.snackBar.open("Note Pinned!", "", { duration: 3000 });
          console.log('pinned: ', data);
        } else {
          // this.snackBar.open("Note Unpinned!", "", { duration: 3000 });
          console.log('unpinned: ', data);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // pinNote(item) {
  //   item.pin = true;
  //   // this.pinValue = true;
  //   this.counter++;
  //   // console.log(item);
  //   this.httpService.post(item, 'pinNote').subscribe(
  //     data => {
  //       console.log('pinned: ', data);
  //       this.messageEvent.emit("Emitted from child")
  //       let snackBarRef = this.snackBar.open("Note Pinned!", "", { duration: 3000 });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

  // unpinNote(item) {
  //   item.pin = false;
  //   // this.pinValue = false;
  //   this.counter--;
  //   // console.log(item);
  //   this.httpService.post(item, 'pinNote').subscribe(
  //     data => {
  //       console.log('unpinned: ', data);
  //       this.messageEvent.emit("Emitted from child")
  //       let snackBarRef = this.snackBar.open("Note Unpinned!", "", { duration: 3000 });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

  changeColor(color, item) {
    item.color = color;
    // console.log(item," ",color);
    this.httpService.post(item, 'changeColor').subscribe(
      data => {
        console.log('colorchange: ', data);
        // this.messageEvent.emit("Emitted from child")
        // let snackBarRef =this.snackBar.open("Color Changed!", "Undo", { duration: 3000 });
      },
      error => {
        console.log(error);
      }
    );
  }


}
