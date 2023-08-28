import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts$: Observable<any[]>;
  constructor(private service: ContactsService) {}

  ngOnInit(): void {
    this.contacts$ = this.service.contacts$;
  }

  deleteContact(contact:any){
    this.service.deleteContact(contact)
  }
}
