import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from './auth.model'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }
  login(userDetails: LoginRequest): Observable<Object> {
    const endpoint: string = environment.apiUrl + '/user/login.php'
    return this.http.post(endpoint, userDetails).pipe(map((loginResponse: LoginResponse) => {
      if (loginResponse) {
        // store user details and access token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUserId', JSON.stringify(loginResponse.id));
        localStorage.setItem('currentUser', JSON.stringify(loginResponse.username));
      }
      return loginResponse;
    }));
  }
}

