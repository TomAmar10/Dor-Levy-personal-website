import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  langData: any;
  error = '';
  successMessage = '';

  constructor(
    private service: ContactService,
    private langService: LanguageService
  ) {}

  contact_form: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    message: new FormControl(''),
  });

  ngOnInit(): void {
    this.langService.langData$.subscribe((data) => {
      this.langData = data.Contact;
      this.error = '';
    });

    this.contact_form.valueChanges.subscribe(() => (this.error = ''));
    document.title = 'דור לוי - יצירת קשר';
  }

  submit() {
    const message = this.contact_form.value.message.slice(0, 250);
    if (this.contact_form.invalid) {
      this.error = this.langData.error;
      this.contact_form.markAllAsTouched();
      return;
    }
    this.contact_form.patchValue({ message });
    this.service.addContact(this.contact_form.value);
    this.successMessage = this.langData.success;
  }

  checkValidity(value: string) {
    return (
      this.contact_form.get(value).touched &&
      this.contact_form.get(value).invalid
    );
  }
}
