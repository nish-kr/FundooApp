import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerUrl } from '../backend.url';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private url = new ServerUrl().serverUrl;
  constructor(private http: HttpClient) { }

  post(data: Object, purpose: String) {
    return this.http.post(this.url + "/" + purpose, data);
  }

  get(purpose: String) {
    return this.http.get(this.url + "/" + purpose);
  }
}


//   return this.http.post<Object>(this.url.registerUrl,newUser).pipe(
  //     tap(console.log(`User Registered ${JSON.stringify(newUser)}`),
  //     catchError(console.log("Some service Error");
  //     )
  //     )
  //   )