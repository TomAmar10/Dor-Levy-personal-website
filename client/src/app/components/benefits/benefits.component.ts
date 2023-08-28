import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css'],
})
export class BenefitsComponent implements OnInit {
  langData: any;
  private phoneNumber = '+972546697750';
  private message = 'היי, הגעתי דרך האתר של דור לוי';
  private whatsappLink = `https://wa.me/${
    this.phoneNumber
  }?text=${encodeURIComponent(this.message)}`;

  imageUrl1 = '../../../assets/images/benefit1.jpg';
  imageUrl2 = '../../../assets/images/benefit2.jpg';

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    document.title = 'דור לוי - הטבות';
    this.langService.langData$.subscribe((data) => {
      this.langData = data.Benefits;
      if (data.Benefits.pageMainHeader === 'Temporary Benefits')
        this.message = "Hi, I arrived through Dor Levi's website";
    });
  }

  get myWhatsAppLink() {
    return this.whatsappLink;
  }
}
