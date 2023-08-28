import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.css'],
})
export class LinksPageComponent implements OnInit {
  langData: any;
  imageUrl = '../../../assets/images/links-img.png';

  constructor(private langService: LanguageService) {}

  goTo(link: string) {
    window.open(link, '_blank');
  }

  ngOnInit(): void {
    this.langService.langData$.subscribe(
      (data) => (this.langData = data.Links)
    );

    document.title = 'דור לוי - קישורים לקבוצות';
  }
}
