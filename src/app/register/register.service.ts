import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) {

  }
  register(userDetails: User): Observable<object> {
    const endpoint: string = environment.apiUrl + '/user/signup.php';
    return this.http.post(endpoint, userDetails).pipe(map(user => {
      return user;
    }));
  }
}
