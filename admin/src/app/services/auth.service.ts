import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { serverUrl } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storeToken = localStorage.getItem('token');
  private isAuthSubject = new BehaviorSubject<boolean>(
    this.storeToken ? true : false
  );

  constructor(private http: HttpClient) {}

  get isAuthenticated$() {
    return this.isAuthSubject.asObservable();
  }

  login(username: string, password: string) {
    let isCorrect = false;
    this.http
      .post(`${serverUrl}auth/login`, { username, password })
      .subscribe((res: any) => {
        isCorrect = res.status && res.status === 200;
        this.isAuthSubject.next(isCorrect);
        localStorage.setItem('token', res.token);
      });
    return isCorrect;
  }

  logout() {
    this.isAuthSubject.next(false);
    localStorage.removeItem('token');
  }
}
