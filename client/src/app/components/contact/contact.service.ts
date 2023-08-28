import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from 'src/app/utils/config';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  addContact(contact: any) {
    console.log(contact);
    this.http
      .post(`${serverUrl}contacts/add`, contact)
      .subscribe((res) => console.log(res));
  }
}
