import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { HttpService } from './http.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public http: HttpService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {

  }
  canActivate(): boolean {
    if (this.http.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('login')
      this.snackBar.open('Jyada Hoshiyaari??', 'Sorry Sir!', { duration: 5000 });
      return false;
    }
  }
}
