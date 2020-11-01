import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../register/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
   }
   public get currentUserValue(): User {
    return this.currentUserSubject.value ? this.currentUserSubject.value : null;
  }
}
