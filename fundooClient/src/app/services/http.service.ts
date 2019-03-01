import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerUrl } from '../backend.url';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private url:String = new ServerUrl().serverUrl;
  constructor(private http: HttpClient,
    // private httpHeaders= new HttpHeaders()
    ) { 
      this.url = new ServerUrl().serverUrl;
    }

  post(data: Object, purpose: String) {
    return this.http.post(this.url + '/' + purpose, data, {});
  }

  get(purpose: String) {
    return this.http.get(this.url + '/' + purpose);
  }

  isLoggedIn(){
    return !!localStorage.getItem('loginToken');
  }
}


//   return this.http.post<Object>(this.url.registerUrl,newUser).pipe(
  //     tap(console.log(`User Registered ${JSON.stringify(newUser)}`),
  //     catchError(console.log("Some service Error");
  //     )
  //     )
  //   )
