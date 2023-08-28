import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { serverUrl } from '../config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contactsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get contacts$() {
    return this.contactsSubject.asObservable();
  }

  fetchContacts() {
    this.http.get<any>(`${serverUrl}contacts/all`).subscribe((res) => {
      if (!res) return;
      const result = Object.values(res);
      this.contactsSubject.next(result);
    });
  }

  deleteContact(contact: any) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    const newList = [
      ...this.contactsSubject.value.filter((c) => c !== contact),
    ];
    this.contactsSubject.next(newList);
    this.http
      .delete<any>(`${serverUrl}contacts/single/delete/${contact._id}`, {
        headers,
      })
      .subscribe(
        (res) => {},
        (err) => this.authService.logout()
      );
  }
}
