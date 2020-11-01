import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../register/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public http: HttpClient) { }

  getProfileDetails(userId: string): Observable<object> {
    const endpoint: string = environment.apiUrl + '/user/profile.php?userId='+userId;
    // return this.http.get(endpoint).pipe(map((info: profileResponse) => {
       return;
    // }));
  }

}
