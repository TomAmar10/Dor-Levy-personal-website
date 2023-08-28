import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  private phoneNumber = '+972526911681';
  private message = 'היי מה קורה? \n הגעתי אליך דרך האתר';
  private whatsappLink = `https://wa.me/${
    this.phoneNumber
  }?text=${encodeURIComponent(this.message)}`;
  langData: any;

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.langService.langData$.subscribe((res) => (this.langData = res.Footer));
  }

  get myWhatsAppLink() {
    return this.whatsappLink;
  }
}
