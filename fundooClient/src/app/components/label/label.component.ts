import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})

export class LabelComponent implements OnInit {

  labelName: any;

  @Input() childMessage: string;

  constructor() { }

  ngOnInit() {
    console.log(this.childMessage);
    this.labelName=this.childMessage;
  }

  getLabelNotes() {

  }

}
