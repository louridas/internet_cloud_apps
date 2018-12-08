import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

class Credentials {
  constructor(public username: string, public password: string) {

  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(username, password) : Observable<boolean> {
    const authUrl = `api/token/`;
    var credentials = new Credentials(username, password);
    return this.http
      .post(authUrl, credentials, httpOptions).pipe(
        map(results => {
          if (results['access']) {
            localStorage.setItem('bangular-jwt-access-token',
                                 results['access']);
            this.isLoggedIn = true;
            if (results['refresh']) {
              localStorage.setItem('bangular-jwt-refresh-token',
                                   results['refresh']);
            }
            return true;
          } else {
            return false;
          }
        }),
        catchError(error => {
          console.log(`Login service: ${error}`);
          return of(false);
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('bangular-jwt-access-token');
    localStorage.removeItem('bangular-jtw-refresh-token');
  }

}
