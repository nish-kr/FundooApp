import { Component, OnInit } from '@angular/core';

// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public icon = 'view_agenda_outline';
  public view = 'List View';
  constructor(
    private router: Router,
    media: MediaMatcher
  ) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  toggleGridListIcon(){
    if(this.icon==='view_agenda_outline'){
      this.icon = 'view_module';
      this.view = "Grid View";
    }else {
      this.icon = 'view_agenda_outline';
      this.view = "List View";
    }
  }
}
