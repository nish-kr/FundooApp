import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,tap,map } from "rxjs/operators";
import { ServerUrl } from './backend.url';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  url: ServerUrl = new ServerUrl();
  constructor(private http: HttpClient) { }

  // registerUser(newUser: Object): Observable<Object> {
  //   return this.http.post<Object>(this.url.registerUrl,newUser).pipe(
  //     tap(console.log(`User Registered ${JSON.stringify(newUser)}`),
  //     catchError(console.log("Some service Error");
  //     )
  //     )
  //   )
  // }
}
