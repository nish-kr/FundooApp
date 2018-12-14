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

  constructor(
    private router: Router,
    media: MediaMatcher
  ) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

}
