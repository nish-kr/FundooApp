import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/services/http.service';
import { ChangeviewService } from 'src/app/services/changeview.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit {

  pinnedIconSrc = "../../assets/Icons/pinIcon.svg";
  unpinnedIconSrc = "../../assets/Icons/unpinIcon.svg";
  data: any;
  notes: Array<Object> = [];
  rowCol: any = "column";
  pinValue: Boolean = false;
  counter: number = 0;
  reminderMenuBool: Boolean = true;
  showReminderMenu: Boolean;
  reminderMenu: String = "reminderMenu";
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  nextWeekDay: String = this.days[new Date().getDay()];
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
    )
  }

  receiveMessage($event) {
    console.log("Message recieved from child: ", $event);
    this.getNotes();
  }

  // toggleReminderMenu() {
  //   if (this.reminderMenu == "reminderMenu") {
  //     this.reminderMenu = "dateMenu";
  //   } else {
  //     this.reminderMenu = "reminderMenu";
  //   }
  // }  

  // toggleReminderMenu() {
  //   if (this.reminderMenuBool == true) {
  //     this.reminderMenuBool = false;
  //   } else {
  //     this.reminderMenuBool = true;
  //   }
  // }

  // toggleShowReminder() {
  //   if (this.showReminderMenu == true) {
  //     this.showReminderMenu = false;
  //   } else {
  //     this.showReminderMenu = true;
  //   }
  // }

  // setReminder(dateInput, timeInput) {
  //   console.log(dateInput, "++++", timeInput);


  // }

  // archiveNote(item) {
  //   item.archive = true;
  //   item.pin = false;
  //   // console.log(item);
  //   this.httpService.post(item, 'archiveNote').subscribe(
  //     data => {
  //       console.log('archived: ', data);
  //       this.getNotes();
  //       let snackBarRef = this.snackBar.open("Note Archived!", "Undo", { duration: 3000 });
  //       snackBarRef.onAction().subscribe(() => {
  //         // console.log("action cliked!");
  //         this.unarchiveNote(item);
  //       })
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

  // unarchiveNote(item) {
  //   // console.log(item);
  //   item.archive = false;
  //   // console.log(item);
  //   this.httpService.post(item, 'archiveNote').subscribe(
  //     data => {
  //       console.log('unarchive: ', data);
  //       this.getNotes();
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

  // deleteNote(item) {
  //   item.trash = true;
  //   item.pin = false;
  //   // console.log(item);
  //   this.httpService.post(item, 'deleteNote').subscribe(
  //     data => {
  //       console.log('deleted: ', data);
  //       this.getNotes();
  //       let snackBarRef = this.snackBar.open("Note Moved to Trash!", "Undo", { duration: 3000 });
  //       snackBarRef.onAction().subscribe(() => {
  //         // console.log("action cliked!");
  //         this.restoreNote(item);
  //       })
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

  // restoreNote(item) {
  //   // console.log(item);
  //   item.trash = false;
  //   console.log(item);
  //   this.httpService.post(item, 'deleteNote').subscribe(
  //     data => {
  //       console.log('delete: ', data);
  //       this.getNotes();
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

  // pinNote(item) {
  //   item.pin = true;
  //   // this.pinValue = true;
  //   this.counter++;
  //   // console.log(item);
  //   this.httpService.post(item, 'pinNote').subscribe(
  //     data => {
  //       console.log('pinned: ', data);
  //       // this.getNotes();
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
  //       // this.getNotes();
  //       let snackBarRef = this.snackBar.open("Note Unpinned!", "", { duration: 3000 });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

  // changeColor(color, item) {
  //   item.color = color;
  //   // console.log(item," ",color);
  //   this.httpService.post(item, 'changeColor').subscribe(
  //     data => {
  //       console.log('colorchange: ', data);
  //       // this.getNotes();
  //       // let snackBarRef =this.snackBar.open("Color Changed!", "Undo", { duration: 3000 });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
}